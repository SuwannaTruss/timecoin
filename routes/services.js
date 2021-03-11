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
    const { id } = req.params;
    try {
    const services = await models.Services.findOne({
        where: {id},
        include: models.Users,
    });
    const result = Object.assign(
        {}, {
            user_id: services.User.id,
            firstname: services.User.firstname,
            lastname: services.User.lastname,
            location: services.User.location,
            service_id: services.id,
            servicename: services.servicename,
            description: services.description
        }
    )
    console.log(result)
    res.send(result);
    } 
    catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post("/", userShouldBeLoggedIn, async (req, res) => {
    const UserId = req.user_id;
    const { servicename, description, categoryId } = req.body;
    try {
        await models.Services.create({
            servicename: servicename,
            description: description,
            categoryId: categoryId,
            UserId: UserId,
        });
        res.send({ message: "your new service has been added"});
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
})

router.patch("/:id", userShouldBeLoggedIn, async (req, res) => {
    // const UserId = req.user_id;
    const { id } = req.params;
    const { servicename, description, categoryId } = req.body;
    try {
        await models.Services.update({
            servicename: servicename,
            description: description,
            categoryId: categoryId,
        },
        {
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

