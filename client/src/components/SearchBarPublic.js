import React, { useState, useEffect } from "react";
import api from "../data/index.js";

export default function SearchBarPublic() {
  const [searchByName, setSearchByName] = useState("");
  const [searchByCategory, setSearchByCategory] = useState("");
  const [services, setServices] = useState([]);

  useEffect(async () => {
    const result = await api.getServices();
    setServices(result.data);
    // console.log(result);
  }, []);

  return (
    <div>
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
      {console.log(searchByCategory)}

      <>
        {services
          .filter((s) => {
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
          .map((data) => {
            if (data) {
              return (
                <div key={data.id}>
                  <h1>{data.servicename}</h1>
                  <h3>{data.categoryId}</h3>
                </div>
              );
            }
            return null;
          })}
      </>
    </div>
  );
}
