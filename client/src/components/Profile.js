import React from "react";
// import authContext from "../contexts/auth";
// import { useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const auth = useAuth();
  return (
    <div>
      <h1>Are we here?</h1>
    </div>
  );
}
