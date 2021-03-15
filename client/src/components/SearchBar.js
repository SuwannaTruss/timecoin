// import React, { useState, useEffect } from "react";
// import api from "../data/index.js";
// import useAuth from "../hooks/useAuth";
// import { NavLink } from "react-router-dom";

// export default function SearchBar() {
//   const auth = useAuth();
//   const [users, setUsers] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(async () => {
//     const result = await api.getUsers();
//     // console.log(result.data);
//     setUsers(result.data);
//   }, []);

//   useEffect(async () => {
//     const result = await api.getCategories();
//     // console.log(result.data);
//     setCategories(result.data);
//   }, []);

//   const [searchByName, setSearchByName] = useState("");
//   const [searchByCategory, setSearchByCategory] = useState("");
//   const [searchByLocation, setSearchByLocation] = useState("");

//   return (
//     <div>
//       <div className="container">
//         <div className="bg-white shadow rounded overflow-hidden">
//           <h3 className="p-3 text-center"> PROTECTED HOME</h3>

//           <div classname="row mr-2">
//             <div class="col form-group mb-4">
//               <input
//                 className="form-control"
//                 key="random1"
//                 placeholder="search service"
//                 onChange={(e) => setSearchByName(e.target.value)}
//               />
//               <input
//                 type="text"
//                 className="form-control"
//                 key="random3"
//                 placeholder="search location"
//                 onChange={(e) => setSearchByLocation(e.target.value)}
//               />
//               <div className="input-group mb-3">
//                 <div className="input-group-prepend">
//                   <label className="input-group-text" for="inputGroupSelect01">
//                     Categories
//                   </label>
//                 </div>

//                 <select
//                   className="custom-select"
//                   id="inputGroupSelect01"
//                   onChange={(e) => setSearchByCategory(e.target.value)}
//                 >
//                   <option selected value="">
//                     Choose...
//                   </option>
//                   {categories.map((c) => (
//                     <option value={c.id}>{c.categoryName}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>

//           {users.map((user) => (
//             // <div key={user.id} className="col-lg-4 col-md-6">
//             <div className="row">
//               {user.Services.filter((s) => {
//                 if (searchByName === "") {
//                   return s;
//                 } else if (
//                   (s.servicename ? s.servicename : "")
//                     .toLowerCase()
//                     .includes(searchByName.toLowerCase())
//                 ) {
//                   return s;
//                 }
//               })
//                 .filter((s) => {
//                   if (searchByCategory === "") {
//                     return s;
//                   } else if (s.categoryId === +searchByCategory) {
//                     return s;
//                   }
//                 })
//                 .filter((s) => {
//                   if (searchByLocation === "") {
//                     return s;
//                   } else if (
//                     (user.location ? user.location : "")
//                       .toLowerCase()
//                       .includes(searchByLocation.toLowerCase())
//                   ) {
//                     return s;
//                   }
//                 })
//                 .map((s) => (
//                   <div key={user.id} className="col-3">
//                     <div className="card shadow service-card col m-2">
//                       <NavLink to={`/service/${s.id}`}>
//                         <img
//                           src="https://img.icons8.com/bubbles/2x/stack-of-photos.png"
//                           className="card-img-top"
//                           alt="..."
//                         />
//                       </NavLink>
//                       <div className="card-body ">
//                         <h4 className="card-title">{s.servicename}</h4>

//                         <h6 className="card-text">
//                           Description: {s.description}
//                         </h6>
//                         <p className="card-text">Category: {s.categoryId}</p>
//                       </div>
//                       <div className="card-body">
//                         <h5>{`${user.firstname} ${user.lastname}`}</h5>
//                         {user.location}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//             // {/* </div> */}
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
