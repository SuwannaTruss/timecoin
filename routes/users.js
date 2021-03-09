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
  const user = await models.Users.findOne({ 
    attributes: ['id', 'username', 'email', 'firstname', 'lastname', 'location'],
    where: { id },
    include: models.Services });
  res.send(user);
});

module.exports = router;
