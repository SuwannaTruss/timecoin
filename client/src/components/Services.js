import React, { useEffect, useState } from "react";
import api from "../data/index.js";
import { NavLink } from "react-router-dom";


export default function Services() {
  useEffect(async () => {
  const results = await api.getServices();
  setServices (results)
},[]);


const [services, setServices] = useState([])


return <div>
    <NavLink to="/NewService">NewService</NavLink>
    <h1>{services.map ((e) => (
      <p>{e.description}</p>
    ))}</h1>
    
    <NavLink to="/Service">Service</NavLink>
    
  </div>;

}

// Services component
// Routes: /services
// list of all services offered
// Link to: individual service


