const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");
const Pusher = require("pusher");
const Messages = require("../models/messages");

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

const pusher = new Pusher({
  key: process.env.PUSHER_KEY,
  appId: process.env.PUSHER_APP_ID,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

router.post("/pusher/auth", userShouldBeLoggedIn, function (req, res) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  //check if I have permission to access the channel
  // private-auth-id -> request Id
  const [_, __, req_id] = channel.split("-"); //maybe i dont need this because the only user is the logged in

  //findAll from request where id = id
  // grab the userId = (senderId)
  //request.service.userId = (receiverId)
  //go to the db find the request with that id and check if the owner of the request or the service of the request, check if both are my current user id (or request.service.userid)

  //find the sender_id and the receiver_id | IF any of those are equal loggedIn

  const loggedInId = req.user_id;

  const sender_id = models.Requests.findOne({
    attributes: ["UserId"],
    where: {
      id: req_id,
    },
  });
  const receiver_id = models.Requests.findOne({
    attributes: ["serviceId"],
    where: { id: req_id },
    include: {
      model: models.Services,
      attributes: ["UserId"],
    },
  });
  if (loggedInId === sender_id || loggedInId === receiver_id) {
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
  const loggedInId = req.user_id;
  try {
    await models.Messages.create({ message, senderId: loggedInId });
    // const request = await models.Requests.findOne({ id });
    // request.createMessage({ text, senderId: req.user.id });
  } catch (err) {
    res.status(500).send(err);
  }
  const channel = `private-timecoinChat-${id}`;

  //trigger an event to Pusher
  pusher.trigger(channel, "message", {
    loggedInId,
    message,
  });

  res.send({ msg: "Sent" });
});

module.exports = router;
