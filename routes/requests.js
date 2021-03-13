const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");

// services_id is selected by the Users with onClick on the service card
// user_id of the user who made a request is from token in header
router.post("/", userShouldBeLoggedIn, async (req, res) => {
    const UserId = req.user_id;
    const { id, storage } = req.body;
    try {
        await models.Requests.create({
            storage: storage,
            UserId: UserId,
            serviceId: id
        });
        res.send({ message: "Your request has been received."});
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});

// use service_id in params, to list out requests received for this service, user's detail here is of the buyer/requester
router.get("/:serviceId", userShouldBeLoggedIn, async (req, res) => {
    const { serviceId } = req.params;
    models.Requests.findAll({
        attributes: ["id", "storage", "status", "UserId", "serviceId"],
        where: { serviceId },
        include: {
           model: models.Users,
           attributes: ["firstname", "lastname", "location"]
        }
    })
    .then((data) => {
        if (data) res.send(data)
        else res.status(404).send({message: "Service not found."})
        })
    .catch((error) => {res.status(500).send(error);
    });
});


module.exports = router;