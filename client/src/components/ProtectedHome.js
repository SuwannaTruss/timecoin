import React, { useState, useEffect } from "react";
import api from "../data/index.js";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";

export default function ProtectedHome() {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const result = await api.getUsers();
        setUsers(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    getUsers();
  }, []);

  useEffect(async () => {
    const result = await api.getCategories();
    // console.log(result.data);
    setCategories(result.data);
  }, []);

  const [searchByName, setSearchByName] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("");
  const [searchByLocation, setSearchByLocation] = useState("");

  const images = (x) => {
    if (x === 1) {
      return "https://img.icons8.com/plasticine/2x/cat-footprint.pnghttps://img.icons8.com/bubbles/2x/flip-chart.png";
    } else if (x === 2) {
      return "https://img.icons8.com/clouds/2x/outdoor-swimming-pool.png";
    } else if (x === 3) {
      return "https://img.icons8.com/officel/2x/kitchen-room.png";
    } else if (x === 4) {
      return "https://img.icons8.com/bubbles/2x/user-group-woman-woman.png";
    } else if (x === 5) {
      return "https://img.icons8.com/plasticine/2x/cat-footprint.png";
    } else if (x === 6) {
      //food
      return "https://img.icons8.com/bubbles/2x/food.png";
    } else return "https://img.icons8.com/bubbles/2x/stack-of-photos.png";
  };

  return (
    <div>
      <div className="container">
        <div className="bg-white shadow rounded overflow-hidden">
          <h3 className="p-3 text-center"> PROTECTED HOME</h3>

          <div classname="row mr-2">
            <div class="col form-group mb-4">
              <input
                className="form-control"
                key="random1"
                placeholder="search service"
                onChange={(e) => setSearchByName(e.target.value)}
              />
              <input
                type="text"
                className="form-control"
                key="random3"
                placeholder="search location"
                onChange={(e) => setSearchByLocation(e.target.value)}
              />
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text" for="inputGroupSelect01">
                    Categories
                  </label>
                </div>

                <select
                  className="custom-select"
                  id="inputGroupSelect01"
                  onChange={(e) => setSearchByCategory(e.target.value)}
                >
                  <option selected value="">
                    Choose...
                  </option>
                  {categories.map((c) => (
                    <option value={c.id}>{c.categoryName}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {users.map((user) => (
            // <div key={user.id} className="col-lg-4 col-md-6">
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
                  <div key={user.id} className="col-3">
                    <div className="card shadow service-card col m-2">
                      <NavLink to={`/service/${s.id}`}>
                        <img
                          src={images(s.categoryId)}
                          className="card-img-top"
                          alt="..."
                        />
                      </NavLink>
                      <div className="card-body ">
                        <h4 className="card-title">{s.servicename}</h4>

                        <h6 className="card-text">
                          Description: {s.description}
                        </h6>
                        <p className="card-text">Category: {s.categoryId}</p>
                      </div>
                      <div className="card-body">
                        <h5>{`${user.firstname} ${user.lastname}`}</h5>
                        {user.location}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            // {/* </div> */}
          ))}
        </div>
      </div>
    </div>
  );
}
//
