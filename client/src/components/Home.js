import { React } from "react";
import useAuth from "../hooks/useAuth";

import ProtectedHome from "./ProtectedHome";
import PublicHome from "./PublicHome";

export default function Home() {
  const auth = useAuth();

  return <div>{auth.isLoggedIn ? <ProtectedHome /> : <PublicHome />}</div>;
}
