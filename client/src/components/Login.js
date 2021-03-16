import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useWallet from "../hooks/useWallet";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import authContext from "../contexts/auth";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const auth = useAuth();
  const wallet = useWallet();

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const login = () => {
    auth.signin(user);
    wallet.getwallet();
  };

  const logout = () => {
    auth.signout();
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          value={user.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2"
        />
        <input
          value={user.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2"
        />
        <button className=" btn btn-dark" onClick={login}>
          Log in
        </button>
        <button className=" btn btn-outline-dark" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}
