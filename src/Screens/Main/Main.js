import React from "react";
import { useSelector } from "react-redux";
import Content from "../Content/Content";
import Login from "../Login/Login";
import "./Main.css";

function Main() {
  const isAuthent = useSelector((state) => state.isAuthenticated);

  const el = !isAuthent ? <Login /> : <Content />;

  return <div className="Main">{el}</div>;
}

export default Main;
