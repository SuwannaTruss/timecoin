const express = require("express");
const router = express.Router();
require("dotenv").config();
// const cors = require("cors");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
const models = require("../models");
const Pusher = require("pusher");
const Messages = require("../models/messages");

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
  const [_, __, req_id] = channel.split("-");
  //findAll from request where id = id
  // grab the userId = (senderId)
  //request.service.userId = (receiverId)
  //go to the db find the request with that id and check if the owner of the request or the service of the request, check if both are my current user id (or request.service.userid)
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
    console.log();
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  } else {
    res.status(401).send({ message: "Please log in" });
  }
});

module.exports = router;
