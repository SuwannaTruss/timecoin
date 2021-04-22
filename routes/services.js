const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");
const services = require("../models/services");
const db = require("../models");
const { sequelize } = require("../models");
const { Op } = require("sequelize");

// require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    const services = await models.Services.findAll();
    res.send(services);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/:id", userShouldBeLoggedIn, (req, res) => {
  const { id } = req.params;
  models.Services.findOne({
    attributes: ["id", "servicename", "description"],
    where: { id },
    include: {
      model: models.Users,
      attributes: [
        "id",
        "username",
        "firstname",
        "lastname",
        "location",
        "picture",
      ],
    },
  })
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: "Service not found." });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
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
    res.send({ message: "your new service has been added" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.patch("/:id", userShouldBeLoggedIn, async (req, res) => {
  // const UserId = req.user_id;
  const { id } = req.params;
  const { servicename, description, categoryId } = req.body;
  try {
    await models.Services.update(
      {
        // servicename: servicename,
        description: description,
        // categoryId: categoryId,
      },
      {
        where: { id },
      }
    );
    res.send({ message: "your service has been updated" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete("/:id", userShouldBeLoggedIn, async (req, res) => {
  // const UserId = req.user_id;
  const { id } = req.params;
  try {
    await models.Services.destroy({
      where: { id },
    });
    res.send({ message: "your offered service has been deleted." });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// count number of requests for my-service.id (where loggedIn users.id = services.Userid).
router.get("/:id/requestCount", userShouldBeLoggedIn, async (req, res) => {
  try {
    const results = await db.sequelize.query(
      'SELECT COUNT(Requests.id) AS requestCount FROM Services LEFT JOIN Requests ON Services.id = Requests.serviceId WHERE serviceId = :id AND Requests.status = "requested"',
      {
        replacements: { id: req.params.id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    res.send(results[0]);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// use service_id in params, to list out requests received for this service, user's detail here is of the buyer/requester
router.get(
  "/:serviceId/requestInfo",
  userShouldBeLoggedIn,
  async (req, res) => {
    const { serviceId } = req.params;
    models.Requests.findAll({
      attributes: [
        "id",
        "serviceDate",
        "serviceTime",
        "amount",
        "storage",
        "status",
        "UserId",
        "serviceId",
      ],
      where: {
        [Op.and]: [
          { serviceId: serviceId },
          {
            [Op.or]: [{ status: "requested" }, { status: "booked" }],
          },
        ],
      },
      include: {
        model: models.Users,
        attributes: ["firstname", "lastname", "location"],
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
);

module.exports = router;
