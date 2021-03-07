import React from "react";

import useProvideAuth from "../hooks/useProvideAuth";
import authContext from "../contexts/auth";

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default ProvideAuth;
