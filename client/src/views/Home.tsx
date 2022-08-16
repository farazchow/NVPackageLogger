import { urlencoded } from "express";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { post } from "../../utilities";
import "../css/home.css";
import "../css/universal.css";
import React from "react";
const Home = () => {
  return (
    <>
      <div className="mainTitle">
        <div className="container">
          <h1 className="mainText">New Vassar Front Desk</h1>
        </div>

        <div className="userButtons">
          <Link to="/logout">
            <button className="button-17">Login</button>
          </Link>
          <br />
          <Link to="/Logout">
            <button className="button-17">Logout</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
