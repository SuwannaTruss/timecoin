import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const auth = useAuth();

  const logout = () => {
    auth.signout();
  };
  // onClick={logout}
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <NavLink to="/">
            <h4 className="navbar-brand">timecoin</h4>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarSupportedContent" className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="mx-1">
                <NavLink to="/register" className="nav-item dropdown">
                  Register
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink to="/profile" className="nav-item dropdown">
                  Profile
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink to="/login" className="nav-item dropdown">
                  {!auth.isLoggedIn && "Login"}
                </NavLink>
              </li>
              <li className="mx-1">
                <NavLink to="/login" className="nav-item dropdown">
                  {auth.isLoggedIn && "Logout"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/wallet" className="nav-item dropdown">
                  Balance: 2h
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
