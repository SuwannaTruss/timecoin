import React, { useState } from "react";

export default function Login() {
  const [user, setUser] = useState({
    username: "test",
    password: "test",
  });

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
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
        {/* <button className=" btn btn-primary" onClick={login}> */}
        <button className=" btn btn-primary">Log in</button>
      </div>
    </div>
  );
}
