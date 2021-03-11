import { React, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
import api from "../data/index.js";

export default function Home() {
  const auth = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const result = await api.getUsers();
    // console.log(result.data);
    setUsers(result.data);
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col mx-auto">
            <div className="bg-white shadow rounded overflow-hidden">
              <h3 className="p-3"> Home</h3>
              <div className="row">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="opencall-display col-lg-4 col-md-6"
                  >
                    <div className="row">
                      {user.Services.map((s) => (
                        <div className="card shadow border-0 service-card col m-2">
                          <NavLink to="/service/:id">
                            <img
                              src="https://img.icons8.com/bubbles/2x/stack-of-photos.png"
                              className="card-img-top"
                              alt="..."
                            />
                          </NavLink>
                          <div className="card-body ">
                            <h5 className="card-title">{s.servicename}</h5>

                            <p className="card-text">{s.description}</p>
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
