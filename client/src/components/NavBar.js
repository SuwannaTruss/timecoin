import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const auth = useAuth();
  return (
    <div>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/profile">Profile</NavLink>

      <div>
        {auth && (
          <div>
            <NavLink to="">logout</NavLink>
            <NavLink to="/wallet">Balance: 2h</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
