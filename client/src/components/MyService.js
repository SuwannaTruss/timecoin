import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../data/index.js";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function MyService() {
  const { id } = useParams();
  const [service, setService] = useState({ User: {} });
  // const [serviceUpdate, setServiceUpdate] = useState({ description: "" });
  const [requestsCount, setRequestsCount] = useState(0);
  const [requestsInfo, setRequestsInfo] = useState([]);
  const [notify, setNotify] = useState("");
  // const [requestStatus, setRequestStatus] = useState({});

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
    getRequestsCountByService(id);
    getRequestsInfoByService(id);
  }, []);

  const updateService = async () => {
    try {
      const response = await axios.patch(
        `/services/${id}`,
        {},
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteService = async () => {
    try {
      const response = await axios.delete(`/services/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getRequestsCountByService = async (id) => {
    try {
      const response = await axios.get(`/services/${id}/requestCount`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setRequestsCount(response.data.requestCount);
    } catch (err) {
      console.log(err);
    }
  };

  const getRequestsInfoByService = async (id) => {
    try {
      const response = await axios.get(`/services/${id}/requestInfo`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setRequestsInfo(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (requestId, newStatus) => {
    try {
      const response = await axios.patch(
        `/requests/${requestId}`,
        { status: newStatus },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data.message);
      if (response.data.message) {
      }
      setNotify(`The status has been updated to ${newStatus}.`);
      getRequestsCountByService(id);
      getRequestsInfoByService(id);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleNotify = () => {
  //   getRequestsCountByService(id);
  //   getRequestsInfoByService(id);
  // }

  return (
    <div>
      {/* <h2 className="p-3">My service</h2> */}
      <div className="col mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <h2 className="pl-5 pt-3 header-service-name">
            {" "}
            {service.servicename}
          </h2>

          <div className="col placing-my-service-card">
            <div className="card border-secondary mb-3 profile-card ">
              <div className="card-header">{service.description}</div>
              <div className="card-body text-secondary">
                <h5 className="card-title">
                  You received {requestsCount} requests for this service
                </h5>
                <div className="card-text">
                  <button
                    className="btn btn-dark btn m-2"
                    onClink={updateService}
                  >
                    Edit Service
                  </button>
                  <button
                    className="btn btn-outline-danger  btn m-2"
                    onClick={deleteService}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {requestsInfo.map((request) => (
            <div className="container service-container mb-5" key={request.id}>
              <div className="row">
                <div className="col-lg-4 col-md-4 ads back-container-service">
                  <h1 className="">
                    <span id="fl">Request</span>
                    <span id="sl">Detail</span>
                  </h1>
                  <div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label
                          className="input-group-text "
                          htmlFor="inputGroupSelect02"
                        >
                          Date
                        </label>
                      </div>
                      <p className="form-control">{request.serviceDate}</p>
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
                      <p className="form-control">{request.serviceTime}</p>
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
                      <p className="form-control">{request.amount}</p>
                    </div>
                    {/* <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <label
                          className="input-group-text"
                          htmlFor="inputGroupSelect01"
                        >
                          Hello!
                        </label>
                      </div>
                      <textarea col="5" row="5" className="form-control">
                        {request.storage}
                      </textarea>
                    </div> */}
                  </div>
                </div>
                <div className="col-lg-4 service-form">
                  <div key={request.id} className="row p-4">
                    {/* <div className="card shadow service-card col m-2"> */}
                    <div className="">
                      <h5 className="">Requested by:</h5>
                      {/* <h6 className="">Description: {service.description}</h6> */}
                      <div className="">
                        <h5>{`${request.User.firstname} ${request.User.lastname}`}</h5>
                        <p>{request.User.location}</p>
                      </div>
                      <div>
                        <h6 className=""> Status: {request.status}</h6>
                      </div>
                    </div>

                    <div className="container mt-2">
                      <div className="row justify-space-between">
                        <button
                          type="button"
                          className="btn btn-sm btn-dark m-1"
                          onClick={() => updateStatus(request.id, "booked")}
                        >
                          Approve
                        </button>
                        <div>
                          <button
                            type="button"
                            className="btn btn-outline-danger m-1"
                            onClick={() =>
                              updateStatus(request.id, "cancelled")
                            }
                          >
                            Decline
                          </button>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-outline-dark m-1"
                            onClick={() =>
                              updateStatus(request.id, "completed")
                            }
                          >
                            Completed
                          </button>
                        </div>
                      </div>
                    </div>

                    {notify && <p>{notify}</p>}
                    {/* </div> */}
                    <NavLink to={`/request/${request.id}`}>
                      <button className="btn btn-sm btn-outline-success mt-5 m-2">
                        Text {request.User.firstname}
                      </button>
                    </NavLink>
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
          ))}
        </div>
      </div>
    </div>
  );
}
