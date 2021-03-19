import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Pusher from "pusher-js";
// import axios from "axios";
// import useAuth from "../hooks/useAuth";
// import api from "../data/index.js";

// Pusher.logToConsole = true;

export default function Chat() {
  // const auth = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  // const [sender, setSender] = useState();

  // let sender = profile.id;
  // let { receiver } = useParams();

  // useEffect(() => {
  //     async function getProfile() { //check api.js
  //       try {
  //         const result = await api.getProfile();
  //         setSender(result.data.id);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     getProfile();
  //   }, []);

  // useEffect(() => {
  //   setMessages([]);
  //   getMessages();

  //   Pusher.logToConsole = true;

  //   var pusher = new Pusher(process.env.PUSHER_KEY , {
  //     cluster: 'eu',
  //     forceTLS: true,
  //     authEndpoint: "/chat/pusher/auth",
  //     auth: {
  //         headers: {
  //             "x-access-token": localStorage.getItem("token"),
  //         },
  //     },
  //   });
  //   const ids = [sender, receiver].sort();
  //   const channelName = `private-timecoinChat-${ids[0]}-${ids[1]}`;

  //   var channel = pusher.subscribe(channelName);
  //   channel.bind('message', function(data) {
  //     //pass function that accepts the previous version of the messages and I return the new version of the messages
  //     setMessages((messages) => [...messages, data])
  //   });

  //   return () => {
  //     pusher.unsubscribe(channelName);
  //   };
  // }, [receiver, sender]);

  // const sendMessage = async () => {
  //   axios.post(`/chat/${sender}/${receiver}`, {
  //     data: {message: input},
  //   });
  // };

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 p-3">
        {messages.map((message) => (
          <div>{message.text}</div>
        ))}
      </div>

      <div className="bg-light p-4 border-top">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={input}
            // onChange={e => setInput(e.target.value)}
            // onKeyPress={e => {
            //   if (e.key === "Enter") sendMessage();
            // }}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
