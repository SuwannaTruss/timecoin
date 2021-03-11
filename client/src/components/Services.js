import React, { useEffect, useState } from "react";
import api from "../data/index.js";
import { NavLink } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(async () => {
    const result = await api.getServices();
    setServices(result.data);
    // console.log(result);
  }, []);
  //description, category, servicename

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col mx-auto">
            <div className="bg-white shadow rounded overflow-hidden">
              <h3 className="p-3 text-center"> PUBLIC HOME</h3>
              <div className="row">
                {services.map((s) => (
                  <div key={s.id} className="col-lg-4 col-md-6">
                    <div className="row">
                      <div className="card shadow service-card col m-2">
                        <img
                          src="https://img.icons8.com/bubbles/2x/stack-of-photos.png"
                          className="card-img-top"
                          alt="..."
                        />

                        <div className="card-body ">
                          <h4 className="card-title">{s.servicename}</h4>
                          <h5 className="card-text">{s.description}</h5>
                          <p className="card-text">Category: {s.CategoryId}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <NavLink to="/NewService">NewService</NavLink>
    //   <NavLink to="/Service">Service</NavLink>

    //   {/* <h1> */}
    //   {services.map((e) => (
    //     <p>{`${e.servicename} ${e.description}`}</p>
    //   ))}

    // </div>
  );
}
