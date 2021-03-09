import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../data/index.js";
//import Services from "../component/Services";

export default function Service() {


  // useEffect(async () => {
  //   const results = await api.getServices();
  //   setServices (results)
  // },[]);

  useEffect(() => {
    getService();
  }, [])

  const [service, setService] = useState([])


  const getService = async() => {
    const results = await api.getService();
    setService(results)
  }

  // const getService = () => {
  //   fetch('/services/:id', {
  //     method:'GET',
  //   }).then(response => response.json()).then(response => {
  //     setService(response)
    
  //   }) 
  //     .catch((error) => {
  //       console.log("Error");
  //     });
  // };


  return <div>
    <NavLink to="/NewService">NewService</NavLink>
    <NavLink to="/RequestService">Request Service</NavLink>
    <NavLink to="/Message">Message</NavLink>

    <div>
    {service.map ((e) => (
      <div><h1>{e.servicename}</h1>
      <p>{e.description}</p>
      </div>

    ))}     
    </div>

<div>
  <button className= "btn btn-lg btn-danger m-2">Message Button</button>
  <button className= "btn btn-lg btn-success m-2">Delete Button</button>
  <button className= "btn btn-lg btn-success mg-2">Request Service Button</button>
</div>
  </div>;




}

// Service component
// Route: /services/:id
// Link to: chat, request,
//need to create button to delete service
