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
  const [service, setService] = useState({
    servicename: "",
    description: "",
    User: { firstname: "", lastname: "" },
  });
  const [request, setRequest] = useState({
    serviceDate: "",
    User: { firstname: "", lastname: "" },
  });
  const [user, setUser] = useState();

  let { id } = useParams();
  let serviceId = request.serviceId;

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
        getService(result.data.Service.id);
      } catch (err) {
        console.log(err);
      }
    }
    getRequest();
  }, []);

  async function getService(id) {
    try {
      const result = await api.getService(id);
      setService(result.data);
    } catch (err) {
      console.log(err);
    }
  }

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
    // <div className="d-flex flex-column ">
    <div className="bg-white shadow rounded overflow-hidden">
      <h2 className="p-3 header-service-name req-detail"> Request Details</h2>
      <div className="chat-container">
        {/* 
        <div className="container service-container mb-5"> */}
        {/* <div className="row"> */}
        <div className="messaging">
          <div className="inbox_msg">
            {/* <div className="col-9 px-0 border-left"> */}
            <div className="inbox_people">
              <div className="inbox_chat">
                <div className="chat_list active_chat">
                  <div className="chat_people">
                    <div class="chat_ib">
                      <h2>{service.servicename}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-3">
                <div className="input-group mb-3 ml-3">
                  <h3 className="border-bottom text-secondary">
                    <i className="far fa-calendar-alt mr-1"></i>
                    {request.serviceDate}
                  </h3>
                </div>
                <div className="input-group mb-3 ml-3">
                  <h3 className="border-bottom text-secondary">
                    <i class="far fa-clock mr-1"></i>
                    {request.serviceTime}
                  </h3>
                </div>
                <div className="input-group mb-3 ml-3">
                  <h3 className="border-bottom text-secondary">
                    <i class="fas fa-hourglass-half mr-1"></i>
                    {request.amount} hour
                  </h3>
                </div>
              </div>
            </div>

            <div>
              <div className="inbox_chat">
                <div className="chat_list active_chat">
                  <div className="chat_people">
                    <div class="chat_ib">
                      {request.User.id == user ? (
                        <div className="row">
                          <img
                            src={`/img/${service.User.picture}`}
                            alt="..."
                            className="chat-image rounded-circle"
                          />
                          <h2>
                            Chat with {service.User.firstname}{" "}
                            {service.User.lastname}{" "}
                          </h2>
                        </div>
                      ) : (
                        <div className="row">
                          <img
                            src={`/img/${request.User.picture}`}
                            alt="..."
                            className="chat-image rounded-circle"
                          />
                          <h2>
                            Chat with {request.User.firstname}{" "}
                            {request.User.lastname}
                          </h2>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mesgs">
                <div className="msg_history">
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
                        <div className="flex-grow-1 p-3">
                          <span
                            className={`px-2 py-1 rounded text-white ${
                              message.SenderId == user
                                ? "bg-primary"
                                : " bg-secondary"
                            }`}
                          >
                            {message.message}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="type_msg">
                  <div className="input_msg_write">
                    <input
                      type="text"
                      className="form-control"
                      value={input}
                      placeholder="Type a message"
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") sendMessage();
                      }}
                    />
                    <button
                      className="msg_send_btn"
                      type="button"
                      onClick={sendMessage}
                    >
                      <i className="far fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
