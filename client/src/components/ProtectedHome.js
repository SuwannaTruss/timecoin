// import { React, useEffect, useState } from "react";
// import useAuth from "../hooks/useAuth";
// import { NavLink } from "react-router-dom";
// import api from "../data/index.js";

// export default function ProtectedHome() {
//   const auth = useAuth();
//   const [users, setUsers] = useState([]);

//   useEffect(async () => {
//     const result = await api.getUsers();
//     // console.log(result.data);
//     setUsers(result.data);
//   }, []);
//   return (
//     <div>
//       <div className="container">
//         <div className="row">
//           <div className="col mx-auto">
//             <div className="bg-white shadow rounded overflow-hidden">
//               <h3 className="p-3 text-center"> PROTECTED HOME</h3>
//               <div className="row">
//                 {users.map((user) => (
//                   <div key={user.id} className="col-lg-4 col-md-6">
//                     <div className="row">
//                       {user.Services.map((s) => (
//                         <div className="card shadow service-card col-4 m-2">
//                           <NavLink to={`/service/${s.id}`}>
//                             <img
//                               src="https://img.icons8.com/bubbles/2x/stack-of-photos.png"
//                               className="card-img-top"
//                               alt="..."
//                             />
//                           </NavLink>
//                           <div className="card-body ">
//                             <h4 className="card-title">{s.servicename}</h4>

//                             <h5 className="card-text">{s.description}</h5>
//                             <p className="card-text">
//                               Category: {s.CategoryId}
//                             </p>
//                           </div>
//                           <div className="card-body">
//                             <h5>{`${user.firstname} ${user.lastname}`}</h5>
//                             {user.location}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
