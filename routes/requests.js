const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");
const Pusher = require("pusher");
const Messages = require("../models/messages");
const { sequelize } = require("../models");
const db = require("../models");

// services_id is selected by the Users with onClick on the service card
// user_id of the user who made a request is from token in header
router.post("/:id", userShouldBeLoggedIn, async (req, res) => {
  const UserId = req.user_id;
  const { id } = req.params;
  const { storage, amount, serviceDate, serviceTime, status } = req.body;
  try {
    const response = await models.Requests.create({
      UserId: UserId,
      serviceId: id,
      storage: storage,
      amount: amount || 1,
      serviceDate: serviceDate || new Date(2021, 3, 20),
      serviceTime: serviceTime,
      status: status || "requested",
    });
    // res.send({ message: "Your request has been received." });
    res.send(response);
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
      attributes: ["firstname", "lastname", "location"],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.patch("/:id", userShouldBeLoggedIn, async (req, res) => {
  const UserId = req.user_id;
  // we need to check if the users have right to update record. now any users that are already logged in can update it.
  const { id } = req.params;
  const { status } = req.body;
  try {
    const request = await models.Requests.update(
      {
        status: status,
      },
      {
        where: { id },
      }
    );
    res.send({ message: "The status has been updated" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// My request (of logged in user) to be used in profile
router.get("/", userShouldBeLoggedIn, async (req, res) => {
  const UserId = req.user_id;
  models.Requests.findAll({
    order: [["createdAt", "DESC"]],
    limit: 5,
    // attributes: ["id", "storage", "status", "amount", "serviceDate", "serviceTime"],
    attributes: ["id", "status", "serviceDate", "serviceTime", "createdAt"],
    where: { UserId },
    include: {
      model: models.Services,
      attributes: ["id", "servicename", "description", "categoryId"],
    },
    raw: true,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// get requests by ID with service info
router.get("/info/:id", userShouldBeLoggedIn, (req, res) => {
  const { id } = req.params;
  models.Requests.findOne({
    attributes: [
      "id",
      "status",
      "amount",
      "serviceDate",
      "serviceTime",
      "serviceId",
    ],
    where: { id },
    include: {
      model: models.Services,
      attributes: ["id", "description", "servicename"],
    },
  })
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: "Request not found." });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

const pusher = new Pusher({
  key: process.env.PUSHER_KEY,
  appId: process.env.PUSHER_APP_ID,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

router.post("/pusher/auth", userShouldBeLoggedIn, async (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;

  const [_, __, req_id] = channel.split("-");
  const loggedInId = req.user_id;

  const getSender = await models.Requests.findOne({
    where: {
      id: req_id,
    },
  });
  let senderId = getSender.UserId;

  const getReceiver = await models.Requests.findOne({
    attributes: ["serviceId"],
    where: { id: req_id },
    include: {
      model: models.Services,
      attributes: ["UserId"],
    },
  });
  let receiverId = getReceiver.Service.UserId;

  if (loggedInId === senderId || loggedInId === receiverId) {
    //all good
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  } else {
    res.status(401).send({ message: "Please log in" });
  }
});

// /requests/34/messages
router.post("/:id/messages", userShouldBeLoggedIn, async (req, res) => {
  let { id } = req.params;
  let message = req.body.data.message;
  const SenderId = req.user_id;
  const getRequestUser = await models.Requests.findOne({
    where: {
      id,
    },
  });
  let requestUserId = getRequestUser.UserId;

  const getServiceUser = await models.Requests.findOne({
    attributes: ["serviceId"],
    where: { id },
    include: {
      model: models.Services,
      attributes: ["UserId"],
    },
  });
  let serviceUserId = getServiceUser.Service.UserId;

  if (SenderId === requestUserId || SenderId === serviceUserId) {
    try {
      const results = await models.Messages.create({
        message,
        SenderId,
        RequestId: id,
      });
      // res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
    let channel = `private-timecoinChat-${id}`;

    //trigger an event to Pusher
    pusher.trigger(channel, "message", {
      SenderId,
      message,
    });
    console.log(
      "SENDER ID: ",
      SenderId,
      "requestUserId: ",
      requestUserId,
      "serviceUserId: ",
      serviceUserId
    );
    res.send({ msg: "Sent" });
  } else {
    res.status(401).send({ message: "Not allowed" });
  }
});

router.get("/:id/messages", userShouldBeLoggedIn, async (req, res) => {
  let { id } = req.params;

  try {
    let messages = await models.Messages.findAll({
      attributes: ["id", "message", "SenderId"],
      where: { RequestId: id },
      limit: 10,
      order: [["id", "ASC"]],
    });
    res.send(messages);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
