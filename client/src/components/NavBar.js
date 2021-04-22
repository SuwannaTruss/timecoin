import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const auth = useAuth();
  const history = useHistory();

  const logout = () => {
    auth.signout(() => history.push("/login"));
  };

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
                {!auth.isLoggedIn && <NavLink to="/register">Register</NavLink>}
              </li>
              <li className="mx-1">
                {auth.isLoggedIn && <NavLink to="/profile">Profile</NavLink>}
              </li>

              <li className="mx-1">
                {!auth.isLoggedIn && (
                  <NavLink to="/login" className="nav-item dropdown">
                    Login
                  </NavLink>
                )}
              </li>

              {auth.isLoggedIn && (
                <li>
                  <NavLink to="/wallet" className="nav-item dropdown">
                    Balance: {auth.wallet.balance}
                  </NavLink>
                </li>
              )}
              <li className="mx-1">
                {auth.isLoggedIn && (
                  <button onClick={logout} className="btn btn-sm btn-dark">
                    Logout
                  </button>
                )}
                {/* <NavLink to="/login" className="nav-item dropdown">
                  {auth.isLoggedIn && "Logout"}
                </NavLink> */}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
