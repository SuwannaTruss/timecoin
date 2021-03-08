const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");
// require("dotenv").config();

// router.post("/", function (req, res) {
//     const { name } = req.body;
//     models.Movie.create({ name })
//       .then((data) => res.send(data))
//       .catch((error) => {
//         res.status(500).send(error);
//       });
//   });