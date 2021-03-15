const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const { username, password, email, firstname, lastname, location } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);

    await models.Users.create({
      username,
      password: hash,
      email,
      firstname,
      lastname,
      location,
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
    ],
    where: { id },
    include: {
      model: models.Services,
      attributes: [ "id", "servicename", "description"]
    }
  })
  .then((data) => res.send(data))
  .catch((error) => {
    res.status(500).send(error);
  });
});

router.get("/", userShouldBeLoggedIn, async (req, res) => {
  const user = await models.Users.findAll({
    attributes: ["id", "username", "firstname", "lastname", "location"],
    include: models.Services,
  });
  res.send(user);
});

// for Seller (User who offer service, this is UserId in services table.
// router.get("/requestCount", userShouldBeLoggedIn, async (req, res) => {
//   const UserId = req.user_id;
//   await models.Services.findAll({
//     where: {UserId},
//     attributes: {
//       include: [
//         [
//           models.Sequelize.fn("COUNT", models.Sequelize.col("Requests.id")),
//           "requestCount",
//         ],
//       ],
//       raw: true,
//     },
//     include: {
//       model: models.Requests,
//       attributes: [],
//     }, 
//     group: ["Services.id"], 
//   })
//   .then((data) => res.send(data))
//   .catch((error) => {
//     res.status(500).send(error);
//   })
// });

router.get("/requestCount", async (req, res) => {
  const result = await models.Requests.findAll({
    where: {
      status: "requested"
      }
    })
    res.send(result)
});


module.exports = router;
