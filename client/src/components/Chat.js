import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import api from "../data/index.js";

export default function Chat() {
  const auth = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  // const [sender, setSender] = useState();
  const [service, setService] = useState({ User: {} });

  let { id, serviceId } = useParams();

  useEffect(() => {
    async function getService() {
      try {
        const result = await api.getService(serviceId);
        console.log(result.data.User.username);
        setService(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    getService();
  }, []);

  useEffect(() => {
    Pusher.logToConsole = true;
    var pusher = new Pusher("f656e2c483a6ebf79c8c", {
      cluster: "eu",
      forceTLS: true,
      authEndpoint: "/requests/:id/messages",
      auth: {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      },
    });

    //private channels MUST start with private-
    const channelTimecoin = `private-timecoinChat-${id}`;

    var channel = pusher.subscribe(channelTimecoin);
    channel.bind("message", function (data) {
      // alert(JSON.stringify(data));
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      pusher.unsubscribe(channelTimecoin);
    };
  }, [id]);

  const sendMessage = async () => {
    axios.post(`/requests/${id}/messages`, {
      data: { message: input },
    });
    setInput("");
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-white shadow rounded overflow-hidden">
        <h2 className="p-3 header-service-name"> {service.servicename}</h2>
        <div className="row border rounded bg-white shadow">
          <div className="col-9 px-0 border-left">
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
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") sendMessage();
                  }}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-primary">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
