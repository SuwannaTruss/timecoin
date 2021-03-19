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
    getRequestsCountByService(id);
    getRequestsInfoByService(id);
  }, []);

  const handleChange = (e) => {
    setNewRequest((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const sendRequest = async () => {
    try {
      console.log(newRequest);
      const response = await axios.post("/requests", newRequest, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

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
      // handleNotify();
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
      <h2 className="p-3">My service</h2>
      <div className="col mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <h3 className="p-3"> {service.servicename}</h3>
          <h5 className="p-3"> {service.description}</h5>
          <div className="container">
            <div className="row p-3">
              <button
                className="btn btn-dark  btn-lg col-2"
                onClink={updateService}
              >
                Edit
              </button>
              <button
                className="btn btn-dark  btn-lg col-2 pl-3 ml-2"
                onClick={deleteService}
              >
                Delete
              </button>
            </div>
          </div>

          {/* Shall we redirect to Profile page once the services.id has been deleted */}
          <h4 className="m-5">
            You received {requestsCount} requests for this service
          </h4>

          {requestsInfo.map((request) => (
            <div className="container service-container mb-5" key={request.id}>
              <div className="row">
                <div className="col-md-3 ads back-container-service">
                  <h1 className="col-3">
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
                    <div className="input-group mb-3">
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
                    </div>
                  </div>
                </div>
                <div className="col-md-9 service-form">
                  <div key={request.id} className="col-4">
                    {/* <div className="card shadow service-card col m-2"> */}
                    <div className="pt-5 mt-2 mb-4">
                      <h5 className="">Requested by:</h5>
                      {/* <h6 className="">Description: {service.description}</h6> */}
                    </div>
                    <div className="">
                      <h5>{`${request.User.firstname} ${request.User.lastname}`}</h5>
                      {request.User.location}
                    </div>
                    <div className="container mt-2">
                      <div className="row justify-space-between">
                        <button
                          type="button"
                          className="btn btn-dark col g-1"
                          onClick={() => updateStatus(request.id, "booked")}
                        >
                          Approved
                        </button>
                        <button
                          type="button"
                          className="btn btn-dark col ml-1"
                          onClick={() => updateStatus(request.id, "cancelled")}
                        >
                          Declined
                        </button>
                        <button
                          type="button"
                          className="btn btn-dark col my-1"
                          onClick={() => updateStatus(request.id, "completed")}
                        >
                          Completed
                        </button>
                      </div>
                    </div>
                    {notify && <p>{notify}</p>}
                    {/* </div> */}
                    <button className="btn btn-sm btn-danger btn-block mt-2">
                      Chat with {request.User.firstname}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
