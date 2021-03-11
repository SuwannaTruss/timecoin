import React, { useEffect, useState } from "react";
import api from "../data/index.js";
import { NavLink } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(async () => {
    const results = await api.getServices();
    setServices(results);
  }, []);

  return (
    <div>
      <NavLink to="/NewService">NewService</NavLink>
      <NavLink to="/Service">Service</NavLink>

      <h1>
        {services.map((e) => (
          <p>{e.servicename}</p>
        ))}
      </h1>
      <h4>
        {services.map((e) => (
          <h4>{e.description}</h4>
        ))}
      </h4>
      <p>
        {services.map((e) => (
          <p>{e.UserId}</p>
        ))}
      </p>
    </div>
  );
}
