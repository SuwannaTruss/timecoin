import { React, useEffect, useState } from "react";
import api from "../data/index.js";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function NewService() {
  const auth = useAuth();

  const [newService, setNewService] = useState([
    { description: "", servicename: "" },
  ]);

  const handleChange = () => {};

  useEffect(async () => {
    const result = await api.addService();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col mx-auto">
            <div className="bg-white shadow rounded overflow-hidden">
              <div className="container service-container">
                <div className="row">
                  <div className="col-md-6 ads back-container">
                    <h1>
                      <span id="fl">New</span>
                      <span id="sl">Service</span>
                    </h1>
                  </div>
                  <div className="col-md-6 login-form ">
                    <div className="login-img">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDkve2IWmP2PI7pfCsAB3qjzxpK24X7ytLQ&usqp=CAU"
                        alt="login_img"
                        height="140px"
                        width="140px;"
                        className="rounded-circle"
                      />
                    </div>
                    <form>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="servicename"
                          placeholder="servicename"
                          value={newService.servicename}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          placeholder="description"
                          value={newService.description}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg btn-block"
                          onClick=""
                        >
                          Send
                        </button>
                      </div>
                    </form>
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

// NewService component
// /new-service
// form with infos to post new service (description, servicename)
