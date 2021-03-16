import React from "react";
import useAuth from "../hooks/useAuth";

export default function Wallet() {
  /* 
  display list of transactions 
  display balance that will come from the BE
  */
  const auth = useAuth();

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col mx-auto">
            <div className="bg-white shadow rounded overflow-hidden mb-4">
              <h3 className="p-3"> Wallet</h3>
            </div>
            <div className="bg-white shadow rounded overflow-hidden">
              <ul>
                <li className="p-3">Initial fund: {auth.wallet.initial_fund}</li>
                <li className="p-3">Balance: {auth.wallet.balance}</li>
                <li className="p-3">Earning: {auth.wallet.earning}</li>
                <li className="p-3">Spending: {auth.wallet.spending}</li>
                <li className="p-3">Available fund: {auth.wallet.available_fund}</li>
                <li className="p-3">Withholding: {auth.wallet.withholding}</li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
