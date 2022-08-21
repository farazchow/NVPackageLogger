import { urlencoded } from "express";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { post } from "../../utilities";
import "../css/home.css";
import "../css/universal.css";
import React from "react";
import { useAuth } from "../auth/useAuth";
const Home = () => {
  const { login, logout } = useAuth();

  return (
    <>
      <div className="mainTitle">
        <div className="container">
          <h1 className="mainText">New Vassar Front Desk</h1>
        </div>

        <div className="userButtons">
          <button className="button-17" onClick={login}>
            Login
          </button>
          <br />
          <button className="button-17" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
