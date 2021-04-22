import { useContext } from "react";
import walletContext from "../contexts/wallet";

function useWallet() {
  return useContext(walletContext);
}

export default useWallet;