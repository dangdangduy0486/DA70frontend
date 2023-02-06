import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Login from "../Login/Login";

const ProtectedRoutes = () => {
  const { email } = useAuth();
  return email ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
