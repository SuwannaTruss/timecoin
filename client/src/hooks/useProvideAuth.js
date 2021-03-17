import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function useProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [wallet, setWallet] = useState({});

  const history = useHistory();

  const signin = async (user, cb = () => {}) => {
    const result = await axios.post("/users/login", user);

    //store it locally
    localStorage.setItem("token", result.data.token);
    setIsLoggedIn(true);

    // an open door so we can do anything after logging in
    cb();

    // .c/atch((error) => console.log(error));
  };

  const signout = (cb = () => {}) => {
    localStorage.clear("token");
    setIsLoggedIn(null);
    cb();
  };

  const getWallet = async () => {
    try {
      const response = await axios.get("/users/wallet", {
        headers: {
          // to send the token back when make a req to Backend
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setWallet(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const clearWallet = () => {
    setWallet({});
  };

  return {
    isLoggedIn,
    signin,
    signout,
    wallet,
    getWallet,
    clearWallet,
  };
}

export default useProvideAuth;
