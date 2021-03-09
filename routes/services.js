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

router.post("/", userShouldBeLoggedIn, async (req, res) => {
    const UserId = req.user_id;
    const { servicename, description } = req.body;
    try {
        await models.Services.create({
            servicename: servicename,
            description: description,
            UserId: UserId
        });
        console.log("auto-generated Service ID:", services.id)
        res.send({ message: "your new service has been added"});
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
})

router.put("/:id", userShouldBeLoggedIn, async (req, res) => {
    // const UserId = req.user_id;
    const { id } = req.params;
    const { servicename, description } = req.body;
    try {
        await models.Services.update({
            servicename: {servicename},
            description: {description},
            where: { id }
        });
        res.send({ message: "your service has been updated"});
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
})

router.delete("/:id", userShouldBeLoggedIn, async (req, res) => {
    // const UserId = req.user_id;
    const { id } = req.params;
    try {
        await models.Services.destroy({
            where: {id}
        });
        res.send({ message: "your offered service has been deleted."});
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
})

module.exports = router;