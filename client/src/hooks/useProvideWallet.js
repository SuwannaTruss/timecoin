import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function useProvideWallet() {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [wallet, setWallet] = useState({})

  const history = useHistory();

  const getWallet = async () => {
    try {
      const response = await axios.get("/users/wallet", {
        headers: {
          // to send the token back when make a req to Backend
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setWallet(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    wallet,
    getWallet
  };
}

export default useProvideWallet;