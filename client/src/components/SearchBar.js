import React, { useState, useEffect } from "react";
import api from "../data/index.js";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

export default function SearchBar() {
  const auth = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const result = await api.getUsers();
    // console.log(result.data);
    setUsers(result.data);
  }, []);

  // const [services, setServices] = useState([]);

  // useEffect(async () => {
  //   const result = await api.getServices();
  //   setServices(result.data);
  //   // console.log(result);
  // }, []);

  const [searchByName, setSearchByName] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("");
  const [searchByLocation, setSearchByLocation] = useState("");

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col mx-auto">
            <div className="bg-white shadow rounded overflow-hidden">
              <h3 className="p-3 text-center"> PROTECTED HOME</h3>
              <input
                key="random1"
                placeholder="search service"
                onChange={(e) => setSearchByName(e.target.value)}
              />
              <input
                key="random2"
                placeholder="search category"
                onChange={(e) => setSearchByCategory(e.target.value)}
              />
              <input
                key="random3"
                placeholder="search location"
                onChange={(e) => setSearchByLocation(e.target.value)}
              />
              <div className="row">
                {users.map((user) => (
                  <div key={user.id} className="col-lg-4 col-md-6">
                    <div className="row">
                      {user.Services.filter((s) => {
                        if (searchByName === "") {
                          return s;
                        } else if (
                          (s.servicename ? s.servicename : "")
                            .toLowerCase()
                            .includes(searchByName.toLowerCase())
                        ) {
                          return s;
                        }
                      })
                        .filter((s) => {
                          if (searchByCategory === "") {
                            return s;
                          } else if (s.categoryId === +searchByCategory) {
                            return s;
                          }
                        })
                        .filter((s) => {
                          if (searchByLocation === "") {
                            return s;
                          } else if (
                            (user.location ? user.location : "")
                              .toLowerCase()
                              .includes(searchByLocation.toLowerCase())
                          ) {
                            return s;
                          }
                        })
                        .map((s) => (
                          <div className="card shadow service-card col-4 m-2">
                            <NavLink to={`/service/${s.id}`}>
                              <img
                                src="https://img.icons8.com/bubbles/2x/stack-of-photos.png"
                                className="card-img-top"
                                alt="..."
                              />
                            </NavLink>
                            <div className="card-body ">
                              <h4 className="card-title">{s.servicename}</h4>

                              <h5 className="card-text">{s.description}</h5>
                              <p className="card-text">
                                Category: {s.categoryId}
                              </p>
                            </div>
                            <div className="card-body">
                              <h5>{`${user.firstname} ${user.lastname}`}</h5>
                              {user.location}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
