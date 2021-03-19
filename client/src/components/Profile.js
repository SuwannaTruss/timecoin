import { React, useEffect, useState } from "react";
// import authContext from "../contexts/auth";
// import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { NavLink } from "react-router-dom";
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

  const images = (x) => {
    if (x === 4) {
      //education
      return "https://img.icons8.com/plasticine/2x/cat-footprint.pnghttps://img.icons8.com/bubbles/2x/flip-chart.png";
    } else if (x === 14) {
      //outdoor
      return "https://img.icons8.com/clouds/2x/outdoor-swimming-pool.png";
    } else if (x === 24) {
      //housework
      return "https://img.icons8.com/officel/2x/kitchen-room.png";
    } else if (x === 34) {
      //caring || people
      return "https://img.icons8.com/bubbles/2x/user-group-woman-woman.png";
    } else if (x === 44) {
      // pet
      return "https://img.icons8.com/plasticine/2x/cat-footprint.png";
    } else if (x === 54) {
      //food
      return "https://img.icons8.com/bubbles/2x/food.png";
    } else return "https://img.icons8.com/bubbles/2x/stack-of-photos.png";
  };

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
                    src={
                      profile.picture
                        ? `/img/${profile.picture}`
                        : "https://image.freepik.com/free-vector/portrait-african-american-woman-profile-avatar-young-black-girl_102172-418.jpg"
                    }
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
            <div className="bg-light p-4 d-flex justify-content-end text-center"></div>
            {/* <div className="px-4 py-3">
              <h5 className="mb-0">About</h5>
              <div className="p-4 rounded shadow-sm bg-light">
                <p>If we need it</p>
              </div>
            </div> */}
            <div className="py-4 px-5">
              <div className="row">
                <div className="col-6 mb-2" key={profile.id}>
                  <h3 className="mb-1  header-profile ">MY SERVICES</h3>
                  <div className="row justify-content">
                    {profile.Services.map((s) => (
                      <div className="card shadow border-0 service-card col-lg-4 m-2 ">
                        <NavLink to={`/my-service/${s.id}`}>
                          {/* {X && 
                          <span className="notify-badge">X</span>} */}
                          <img
                            src={images(s.categoryId)}
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
                <div className="col-6">
                  <div className="row">
                    <div className="col placing-profile-card">
                      <div className="card border-info mb-3 profile-card">
                        <div className="card-header">
                          <h5 className="font-weight-bold mb-0 d-block text-muted">
                            <i className="fas fa-wallet"></i>
                            My Wallet
                          </h5>
                        </div>
                        <div className="card-body ">
                          <NavLink to="/wallet">
                            <h5 className="card-text text-info">
                              Balance: {auth.wallet.balance}
                            </h5>
                          </NavLink>
                          <p className="text-secondary">
                            Available fund: {auth.wallet.available_fund}
                          </p>
                          <p className="text-secondary">
                            Earning: {auth.wallet.earning}
                          </p>
                          <p className="text-secondary">
                            Spending: {auth.wallet.spending}
                          </p>
                          <p className="text-secondary">
                            Withholding: {auth.wallet.withholding}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col placing-profile-card">
                      <div className="card border-info mb-3 profile-card">
                        <div className="card-header">
                          <h5 className="font-weight-bold mb-0 d-block text-muted">
                            <i className="fas fa-list-ul"></i>
                            My Requests
                          </h5>
                        </div>

                        <div className="card-body ">
                          {" "}
                          <h5 className="card-text text-info">Total</h5>
                          <p className="text-secondary">
                            Place here all the requests I've made.
                          </p>
                        </div>
                      </div>
                    </div>
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
