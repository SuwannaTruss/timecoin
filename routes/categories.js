const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");


router.get("/", (req, res) => {
    models.Categories.findAll({
        attributes: ["id", "categoryName"],
        include: {
            model: models.Services,
            attributes: ["id", "servicename", "description"]
        }
    })
    .then((data) => res.send(data))
    .catch((error) => {
      res.status(500).send(error);
    })    
});

module.exports = router;