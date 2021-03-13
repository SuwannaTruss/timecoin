import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../data/index.js";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Service() {
  const [service, setService] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getService();
  }, []);

  const getService = async () => {
    const results = await api.getService(id);
    // setService(results.data);
    console.log(results);
  };

  return (
    <div>
      <NavLink to="/NewService">NewService</NavLink>
      <NavLink to="/RequestService">Request Service</NavLink>
      <NavLink to="/Message">Message</NavLink>

      <div>
        <div>
          <h1>{service.servicename}</h1>
          <h3>{service.description}</h3>
          <h4>{`${service.firstname} ${service.lastname} `}</h4>
          <h5>{service.location}</h5>
        </div>
      </div>

      <div>
        <button className="btn btn-lg btn-danger m-2">Message Button</button>
        <button className="btn btn-lg btn-success m-2">Delete Button</button>
        <button className="btn btn-lg btn-success mg-2">
          Request Service Button
        </button>
      </div>
    </div>
  );
}

// Service component
// Route: /services/:id
// Link to: chat, request,
//need to create button to delete service
