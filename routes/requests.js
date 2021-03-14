const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");

// services_id is selected by the Users with onClick on the service card
// user_id of the user who made a request is from token in header
router.post("/", userShouldBeLoggedIn, async (req, res) => {
    const UserId = req.user_id;
    const { id, storage, amount, serviceDate, serviceTime, status } = req.body;
    try {
        await models.Requests.create({
            UserId: UserId,
            serviceId: id,
            storage: storage,
            amount: amount || 1,
            serviceDate: serviceDate || new Date(2021, 3, 20),
            serviceTime: serviceTime,
            status: status || "requested"
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
    .then((data) => {res.send(data)})
    .catch((error) => {res.status(500).send(error);
    });
});

router.patch("/:id", userShouldBeLoggedIn, async (req, res) => {
    const UserId = req.user_id;
    // we need to check if the users have right to update record. now any users that are already logged in can update it.
    const { id } = req.params;
    const { status } = req.body;
    try {
        await models.Requests.update({
            status: status,
        },
        {
            where: { id }
        }); 
        res.send({ message: "The service request has been approved."});
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
});


module.exports = router;