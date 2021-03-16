import { React, useEffect, useState } from "react";
// import authContext from "../contexts/auth";
// import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { NavLink, Link } from "react-router-dom";
import api from "../data/index.js";

export default function Profile() {
  const auth = useAuth();

  const [profile, setProfile] = useState({ Services: [] });

  // useEffect(async () => {
  //   const result = await api.getProfile();
  //   setProfile(result.data);
  // }, []);

  useEffect(() => {
    async function getProfile() {
      try {
        const result = await api.getProfile();
        console.log(result.data);
        setProfile(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    auth.getWallet();
    getProfile();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {/* <NavLink to="/wallet">Wallet</NavLink> */}
        <div className="col mx-auto">
          <div className="bg-white shadow rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-end profile-head">
                <div className="profile mr-3">
                  <img
                    src="https://image.freepik.com/free-vector/portrait-african-american-woman-profile-avatar-young-black-girl_102172-418.jpg"
                    alt="..."
                    width="130"
                    className="rounded mb-2 img-thumbnail"
                  />
                  <button className="btn btn-outline-dark btn-sm btn-block">
                    Edit profile
                  </button>
                </div>
                <div className="media-body mb-5 text-white">
                  <h2 className="mt-0 mb-0">{`${profile.firstname} ${profile.lastname}`}</h2>
                  <p className="small mb-4">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-light p-4 d-flex justify-content-end text-center">
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block text-muted">
                  <i className="fas fa-wallet"></i>
                  My Wallet 
                  <small>   (Balance: {auth.wallet.balance}  Available: {auth.wallet.available_fund})</small> 
                </h5>
              </li>
            </div>
            <div className="px-4 py-3">
              <h5 className="mb-0">About</h5>
              <div className="p-4 rounded shadow-sm bg-light">
                <p>If we need it</p>
              </div>
            </div>
            <div className="py-4 px-5">
              <h3 className="mb-1 text-center">SERVICES</h3>
              <div className="row">
                <div className="col-6 mb-2" key={profile.id}>
                  <div className="row justify-content">
                    {profile.Services.map((s) => (
                      <div className="card shadow border-0 service-card col-lg-4 m-2 ">
                        <NavLink to={`/my-service/${s.id}`}>
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
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <NavLink to="/new-service">
                <button className="btn btn-outline-dark btn-sm">
                  Add service
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
Profile component
Routes: /profile | /profile/edit
Link to: wallet, services offered, services received

create a logout button
*/
