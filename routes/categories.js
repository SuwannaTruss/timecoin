const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");

router.get("/", (req, res) => {
  models.Categories.findAll({
    attributes: ["id", "categoryName", "image"],
    include: {
      model: models.Services,
      attributes: ["id", "servicename", "description"],
    },
  })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.patch("/:id", async (req, res) => {
  // we need to check if the users have right to update record. now any users that are already logged in can update it.
  const { id } = req.params;
  const { image } = req.body;
  try {
    await models.Categories.update(
      {
        image: image,
      },
      {
        where: { id },
      }
    );
    res.send({ message: "The image request has been uploaded." });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
