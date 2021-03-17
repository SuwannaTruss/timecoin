import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../data/index.js";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Service() {
  const { id } = useParams();
  const [service, setService] = useState({ User: {} });

  const [newRequest, setNewRequest] = useState({
    serviceId: id,
    amount: "",
    serviceDate: "",
    serviceTime: "",
    storage: "",
  });

  useEffect(() => {
    async function getService() {
      try {
        const result = await api.getService(id);
        console.log(result.data.User.username);
        setService(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    getService();
  }, [id]);

  const handleChange = (e) => {
    setNewRequest((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const sendRequest = async () => {
    try {
      console.log(newRequest);
      const response = await axios.post(`/requests/${id}`, newRequest, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const sendRequest = () => {
    fetch("/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRequest),
    })
      .then(() => {})
      .catch((error) => {
        console.log("Error");
      });
  };
  function handleClick() {
    sendRequest();
    //userId
    //serviceId
    //post request to requests table
    //pass the token
  }

  // async getServices() {
  //   try {
  //     const response = await axios.get("/services");
  //     return response;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },

  return (
    <div>
      <div className="col mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <h3 className="p-3"> {service.servicename}</h3>
          <div className="container service-container mb-5">
            <div className="row">
              <div className="col-md-3 ads back-container-service">
                <h1 className="col-3">
                  <span id="fl">Request</span>
                  <span id="sl">Service</span>
                </h1>
                <form>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text "
                        htmlFor="inputGroupSelect02"
                      >
                        Date
                      </label>
                    </div>
                    <input
                      type="date"
                      id="inputGroupSelect02"
                      className="form-control"
                      name="serviceDate"
                      value={newRequest.serviceDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text "
                        htmlFor="inputGroupSelect03"
                      >
                        Time
                      </label>
                    </div>
                    <input
                      type="time"
                      id="inputGroupSelect03"
                      className="form-control"
                      name="serviceTime"
                      value={newRequest.serviceTime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Hours
                      </label>
                    </div>
                    <input
                      type="text"
                      id="inputGroupSelect01"
                      className="form-control"
                      name="amount"
                      placeholder="For how many hours?"
                      value={newRequest.amount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Hello!
                      </label>
                    </div>
                    <input
                      type="text"
                      id="inputGroupSelect01"
                      className="form-control"
                      placeholder="Say something :)"
                      name="storage"
                      value={newRequest.storage}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-dark  btn-lg btn-block"
                      onClick={sendRequest}
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-9 service-form">
                <div key={service.id} className="col-3">
                  {/* <div className="card shadow service-card col m-2"> */}

                  <div className="">
                    <h4 className="">{service.servicename}</h4>

                    <h6 className="">Description: {service.description}</h6>
                  </div>

                  <div className="">
                    <h5>{`${service.User.firstname} ${service.User.lastname}`}</h5>
                    {service.User.location}
                  </div>

                  {/* </div> */}
                  <button className="btn btn-sm btn-danger m-2">
                    Chat with {service.User.firstname}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="btn btn-lg btn-danger m-2">Message Button</button>
          <button className="btn btn-lg btn-success m-2">Delete Button</button>
          <button onClick={handleClick} className="btn btn-lg btn-success mg-2">
            Request Service Button
          </button>
        </div>
      </div>
    </div>
  );
}
