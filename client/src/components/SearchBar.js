import React, { useState, useEffect } from "react";
import api from "../data/index.js";

export default function SearchBar() {
  const [keyword, setKeyword] = useState();
  const [services, setServices] = useState([]);
  const [servicesDefault, setServicesDefault] = useState([]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
    updateInput(e.target.value);
  };

  const updateInput = async (input) => {
    const filtered = servicesDefault.filter((service) => {
      return service.servicename.toLowerCase().includes(input.toLowerCase());
    });
    setKeyword(input);
    setServices(filtered);
  };

  useEffect(async () => {
    const result = await api.getServices();
    setServices(result.data);
    setServicesDefault(result.data);
    // console.log(result);
  }, []);

  return (
    <div>
      <input
        key="random1"
        value={keyword}
        placeholder={"search service"}
        onChange={handleChange}
      />
      <button className="btn btn-dark" onClick="">
        Search
      </button>
      <>
        {services.map((data, index) => {
          if (data) {
            return (
              <div key={data.id}>
                <h1>{data.servicename}</h1>
              </div>
            );
          }
          return null;
        })}
      </>
    </div>
  );
}
