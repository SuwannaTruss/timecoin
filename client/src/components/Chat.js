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

  // useEffect(() => {
  //   async function getTest() {
  //     try {
  //       const result = await axios.get(`/requests/test/${id}`);
  //       console.log(result.data.UserId);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getTest();
  // }, []);

  let { id, serviceId } = useParams();

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
        console.log(result.data.User.username);
        setService(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    getService();
  }, []);

  useEffect(() => {
    setMessages([]);
    getMessages();
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
    const channelTimecoin = `private-timecoinChat-${id}`;

    var channel = pusher.subscribe(channelTimecoin);
    channel.bind("message", function (data) {
      setMessages((messages) => [...messages, data]);
    });

    return () => {
      pusher.unsubscribe(channelTimecoin);
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

  const getMessages = async () => {
    let { data } = await axios(`/request/${id}/messages`);

    setMessages((messages) => [...messages, ...data]);
  };

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
                {messages.map((message) => (
                  <div>{message.text}</div>
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
