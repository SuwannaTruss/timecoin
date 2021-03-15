import { React, useEffect, useState } from "react";
import api from "../data/index.js";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function NewService() {
  const auth = useAuth();
  const [categories, setCategories] = useState([]);

  const [newService, setNewService] = useState({
    servicename: "",
    description: "",
    categoryId: "",
  });

  const handleChange = (e) => {
    setNewService((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const addService = async () => {
    try {
      console.log(newService);
      const response = await axios.post("/services", newService, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    const result = await api.getCategories();
    setCategories(result.data);
  }, []);

  useEffect(async () => {
    const result = await api.getCategories();
    // console.log(result.data);
    setCategories(result.data);
  }, []);

  return (
    <div>
      <div className="container new-service-container">
        <div className="row">
          <div className="col mx-auto">
            <div className="bg-white shadow rounded overflow-hidden">
              <div className="container service-container mb-5">
                <div className="row">
                  <div className="col-md-3 ads back-container">
                    <h1 className="col-3">
                      <span id="fl">New</span>
                      <span id="sl">Service</span>
                    </h1>
                  </div>
                  <div className="col-md-9 service-form">
                    <div className="new-service-img">
                      <img
                        src="https://themighty.com/wp-content/uploads/2020/03/GettyImages-1152840785-2-640x213.jpg?v=1585671432"
                        alt="new_service_img"
                        className=""
                      />
                    </div>
                    <form>
                      <div className="input-group">
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
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <label
                            className="input-group-text bg-info"
                            htmlFor="inputGroupSelect01"
                          >
                            Category
                          </label>
                        </div>
                        <select
                          className="custom-select"
                          id="inputGroupSelect01"
                          onChange={handleChange}
                          name="categoryId"
                        >
                          <option selected>Choose...</option>
                          {categories.map((c) => (
                            <option value={c.id}>{c.categoryName}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <button
                          type="button"
                          className="btn btn-outline-dark  btn-lg btn-block"
                          onClick={addService}
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
