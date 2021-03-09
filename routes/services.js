const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");
// require("dotenv").config();

router.get("/", async (req, res) => {
    try {
    const services = await models.Services.findAll();
    res.send(services);
    } 
    catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
    const UserId = req.user_id;
    try {
    const service = await models.Services.findOne({
        attributes: ['description', 'servicename'],
        where: { UserId }
    });
    res.send(service);
    } catch (err) {
        res.status(400).send({ message: err.message });
});


router.post("/", userShouldBeLoggedIn, async (req, res) => {
    const UserId = req.user_id;
    try {
        const services = await models.Services.findAll({
            attributes: [ 'description', 'servicename'],
            where: { UserId }
        });
        res.send(services);
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
})

module.exports = router;