const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sequelize } = require("../models");
const db = require("../models");
const saltRounds = 10;
const { v4: uuidv4 } = require("uuid");
var path = require("path");
var mime = require("mime-types");
var fs = require("fs/promises");

const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const { username, password, email, firstname, lastname, location } = req.body;
  const { imagefile } = req.files;
  const extension = mime.extension(imagefile.mimetype);
  const filename = uuidv4() + "." + extension;
  const tmp_path = imagefile.tempFilePath;
  const target_path = path.join(__dirname, "../public/img/") + filename;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    await fs.rename(tmp_path, target_path);

    await models.Users.create({
      username,
      password: hash,
      email,
      firstname,
      lastname,
      location,
      picture: filename,
    });

    res.send({ message: "Register successful" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await models.Users.findOne({ where: { username } });

    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

/* router.get("/profile", userShouldBeLoggedIn, async (req, res) => {
  const id = req.user_id;
  models.Users.findOne({
    attributes: [
      "id",
      "username",
      "email",
      "firstname",
      "lastname",
      "location",
      "picture",
    ],
    where: { id },
    include: {
      model: models.Services,
      attributes: ["id", "servicename", "description", "categoryId"],
    },
  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
}); */

router.get("/profile", userShouldBeLoggedIn, async (req, res) => {
  const id = req.user_id;
  models.Users.findOne({
    attributes: [
      "id",
      "username",
      "email",
      "firstname",
      "lastname",
      "location",
      "picture",
    ],
  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

// add note
// New: Get profile with count number of request a loggedIn user received.
// `SELECT Users.id, Users.username, Users.firstname, Users.lastname, Users.location, Users.picture, Services.id, Services.serviceName, Services.description, Requests.status, SUM(CASE WHEN Requests.status = 'requested' THEN 1 ELSE 0 END) AS requestCount FROM Users CROSS JOIN Services ON Users.id = Services.UserId LEFT JOIN Requests ON Services.id = Requests.serviceId WHERE Users.id = :id AND Requests.status = "requested" GROUP BY services.id`
router.get("/MyServicesWithBadge", userShouldBeLoggedIn, async (req, res) => {
  try {
    const results = await db.sequelize.query(
      `SELECT Users.id, Users.username, Users.firstname, Users.lastname, Users.location, Users.picture, Services.id, Services.serviceName, Services.description, Services.categoryId, COUNT(Services.id) AS serviceCount, Requests.status, SUM(CASE WHEN Requests.status = 'requested' THEN 1 ELSE 0 END) AS requestCount FROM Users CROSS JOIN Services ON Users.id = Services.UserId LEFT JOIN Requests ON Services.id = Requests.serviceId WHERE Users.id = :id GROUP BY Services.id, requests.status`,
      {
        replacements: { id: req.user_id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    res.send(results);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});


/* // Not using now, replaced by profileWithBadge
//counting of requests I receive for each service I offered.
router.get("/requestNotifyBadge", userShouldBeLoggedIn, async (req, res) => {
  try {
    const results = await db.sequelize.query(
      'SELECT Users.id, Services.id, COUNT(Requests.id) AS requestCount FROM Users LEFT JOIN Services ON Users.id = Services.UserId LEFT JOIN Requests ON Services.id = Requests.serviceId WHERE Users.id = :id AND Requests.status = "requested" GROUP BY services.id',
      {
        replacements: { id: req.user_id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    res.send(results);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}); */

router.get("/", userShouldBeLoggedIn, async (req, res) => {
  const user = await models.Users.findAll({
    attributes: ["id", "username", "firstname", "lastname", "location"],
    include: models.Services,
  });
  res.send(user);
});

// to calcualte wallet (balance = earning - spending), (available fund = balance - withholding)
// 1. (+) earning: sum of requests.amount for users ON user.id = services.UserId WHERE requests.status = completed
// 2. (-) spending: sum of requests.amount for users ON user.id = request.UserId WHERE requests.status = completed
// 3. (-) withholding: sum of requests.amount for users ON user.id = request.UserId WHERE requests.status = booked
router.get("/wallet", userShouldBeLoggedIn, async (req, res) => {
  const initial_fund = 3;
  let earning, spending, withholding, balance, available_fund;
  try {
    earning = await db.sequelize.query(
      'SELECT Users.id, Users.username, Users.firstname, Users.lastname, SUM(Requests.amount) AS earning FROM Users LEFT JOIN Services ON Users.id = Services.UserId LEFT JOIN Requests ON Services.id = Requests.serviceId WHERE Users.id = :id AND Requests.status = "completed" GROUP BY Users.id',
      {
        replacements: { id: req.user_id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    spending = await db.sequelize.query(
      'SELECT Users.id, Users.username, Users.firstname, Users.lastname, SUM(Requests.amount) AS spending FROM Users LEFT JOIN Requests ON Users.id = Requests.UserId WHERE Users.id = :id AND Requests.status = "completed" GROUP BY Users.id',
      {
        replacements: { id: req.user_id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    withholding = await db.sequelize.query(
      'SELECT Users.id, Users.username, Users.firstname, Users.lastname, SUM(Requests.amount) AS withholding FROM Users LEFT JOIN Requests ON Users.id = Requests.UserId WHERE Users.id = :id AND Requests.status = "booked" GROUP BY Users.id',
      {
        replacements: { id: req.user_id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    (earning = earning.length ? parseInt(earning[0].earning) : 0),
      (spending = spending.length ? parseInt(spending[0].spending) : 0),
      (withholding = withholding.length
        ? parseInt(withholding[0].withholding)
        : 0),
      (balance = initial_fund + earning - spending);
    available_fund = balance - withholding;

    const data = {
      balance: balance,
      available_fund: available_fund,
      earning: earning,
      spending: spending,
      withholding: withholding,
      initial_fund: initial_fund,
    };
    res.send(data);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
