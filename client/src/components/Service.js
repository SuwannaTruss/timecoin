import React, { useEffect, useState } from "react";

import api from "../data/index.js";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export default function Service() {
  const { id } = useParams();
  const [service, setService] = useState({ User: {} });
  const history = useHistory();

  const [newRequest, setNewRequest] = useState({
    serviceId: id,
    amount: "",
    serviceDate: "",
    serviceTime: "",
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
      return history.push(`/request/${response.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="col mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <h2 className="p-3 header-service-name"> {service.servicename}</h2>
          <div className="container service-container mb-5">
            <div className="row">
              <div className="col-lg-4 col-md-4 ads back-container-service">
                <h1 className="">
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
              <div className="col-lg-4 service-form">
                <div key={service.id} className="row p-4">
                  {/* <div className="card shadow service-card col m-2"> */}

                  <div className="">
                    <h2 className="">{service.servicename}</h2>

                    <h4 className="">Description: {service.description}</h4>
                  </div>

                  <div className="">
                    <h5>{`${service.User.firstname} ${service.User.lastname}`}</h5>
                    <p>{service.User.location}</p>
                  </div>

                  {/* </div> */}
                </div>
              </div>
              <div className="col-lg-4">
                <img
                  className="request-img"
                  src="http://www.trec.on.ca/wp-content/uploads/2017/04/CB-graphic-communityimpact.png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
