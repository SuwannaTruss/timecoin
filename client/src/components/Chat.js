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
  const [service, setService] = useState({ User: {} });
  const [request, setRequest] = useState({ serviceDate: "" });
  const [user, setUser] = useState();

  let { id, serviceId } = useParams();

  useEffect(() => {
    async function getProfile() {
      try {
        const result = await api.getProfile();
        setUser(result.data.id);
      } catch (err) {
        console.log(err);
      }
    }
    getProfile();
  }, []);

  useEffect(() => {
    async function getRequest() {
      try {
        const result = await axios.get(`/requests/info/${id}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        setRequest(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    getRequest();
  }, []);

  useEffect(() => {
    async function getService() {
      try {
        const result = await api.getService(serviceId);
        setService(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    getService();
  }, []);

  useEffect(() => {
    setMessages([]);
    Pusher.logToConsole = true;
    var pusher = new Pusher("f656e2c483a6ebf79c8c", {
      cluster: "eu",
      forceTLS: true,
      authEndpoint: "/requests/pusher/auth",
      auth: {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      },
    });

    //private channels MUST start with private-
    const channel_name = `private-timecoinChat-${id}`;

    var channel = pusher.subscribe(channel_name);
    channel.bind("message", function (data) {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      pusher.unsubscribe(channel_name);
    };
  }, [id]);

  const sendMessage = async () => {
    const response = await axios.post(
      `/requests/${id}/messages`,
      {
        data: { message: input },
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );
    setInput("");
    return response;
  };

  useEffect(() => {
    const getMessages = async () => {
      let { data } = await axios.get(`/requests/${id}/messages`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      setMessages((messages) => [...messages, ...data]);
      // console.log(result.data);
    };

    getMessages();
  }, []);

  return (
    <div className="d-flex flex-column ">
      <div className="bg-white shadow rounded overflow-hidden">
        <h2 className="p-3 header-service-name"> Request Details</h2>
        <div className="container service-container mb-5">
          <div className="row">
            {/* <div className="col-9 px-0 border-left"> */}
            <div className="col-lg-3 col-md-4 ads back-container-service">
              <h1 className="">
                {/* <span id="fl">Request</span> */}
                <span id="sl" className="text-center">
                  {service.servicename}
                </span>
              </h1>
              <div className="input-group mb-3">
                <h5>Day: {request.serviceDate}</h5>
              </div>
              <div className="input-group mb-3">
                <h5>Time: {request.serviceTime}</h5>
              </div>
              <div className="input-group mb-3">
                <h5>For how long? {request.amount} hour</h5>
              </div>
            </div>

            <div className="col-9 bg-light p-4 border-top">
              <div className="flex-grow-1 p-3">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.SenderId == user
                        ? "text-right my-2"
                        : "text-left my-2"
                    }
                  >
                    <div className="">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          message.SenderId == user
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {message.message}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
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
                  <button
                    className="btn btn-outline-primary"
                    onClick={sendMessage}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
