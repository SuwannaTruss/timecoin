import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
// import axios from "axios";
// import { useHistory } from "react-router-dom";
// import authContext from "../contexts/auth";

export default function Login() {
  const [user, setUser] = useState({
    username: "test",
    password: "test",
  });

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const auth = useAuth();

  const login = () => {
    auth.signin(user);
  };

  const logout = () => {
    auth.signout();
  };
  // const login = () => {
  //   fetch("/users/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.message);
  //       localStorage.setItem("token", data.token);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // const history = useHistory();

  // const login = async (req, res) => {
  //   try {
  //     let result = await axios.post("/users/login", user);
  //     console.log(result.data.message);
  //     localStorage.setItem("token", result.data.token);
  //     //change the url to redirect to the right page after login
  //     if (result) history.push("/");
  //   } catch (err) {
  //     res.status(400).send({ message: err.message });
  //   }
  // };

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
