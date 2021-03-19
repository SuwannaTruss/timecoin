import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  BrowserRouter as Redirect,
  NavLink,
  useHistory,
} from "react-router-dom";

// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import authContext from "../contexts/auth";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();
  const history = useHistory();

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const login = async () => {
    try {
      let result = await auth.signin(user);
      auth.getWallet();
      // AuthRoute();
    } catch (err) {
      console.log(err);
    }
  };

  const AuthRoute = () => {
    if (auth.isLoggedIn) return <Redirect to="/"></Redirect>;
  };

  const logout = () => {
    auth.signout();
    auth.clearWallet();
  };

  return (
    <div>
      <div>
        <div>
          <h1 classname="text-secondary">Login</h1>
        </div>
        <div className="login-form-1">
          <div id="login-form" className="text-left">
            <div className="login-form-main-message"></div>
            <div className="main-login-form">
              <div className="login-group">
                <div className="form-group">
                  <label htmlFor="lg_username" className="sr-only">
                    Username
                  </label>
                  <input
                    value={user.username}
                    onChange={handleChange}
                    name="username"
                    type="text"
                    className="form-control"
                    id="lg_username"
                    placeholder="username "
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lg_password" className="sr-only">
                    Password
                  </label>
                  <input
                    className="form-control"
                    id="lg_password"
                    placeholder="password"
                    value={user.password}
                    onChange={handleChange}
                    name="password"
                    type="password"
                  />
                </div>

                <div className="form-group login-group-checkbox">
                  <input type="checkbox" id="lg_remember" name="lg_remember" />
                  <label htmlFor="lg_remember">remember</label>
                </div>
              </div>
              <button className="login-button" onClick={login}>
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
            <div className="etc-login-form">
              {/* <p>
                forgot your password? <a href="#">click here</a>
              </p> */}
              <p>
                new user? <NavLink to="/register">create a new account</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
