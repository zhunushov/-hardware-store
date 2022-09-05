import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Login from "./login";
import { AuthRoutes } from "../../utils/const";
import Authorization from "./Authorization";

const Auth = () => {
  const isLoggin = useLocation().pathname === "/login";
  return <>{isLoggin ? <Login /> : <Authorization />}</>;
};

export default Auth;
