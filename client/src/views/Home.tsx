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
          <h1 className="mainText">
            New Vassar Front Desk
            {/* <img
              className="boxIcon"
              src={require("../images/box.png").default}
            /> */}
          </h1>
        </div>

        <div className="userButtons">
          <Link to="/l">
            <button className="button-17">Login Here</button>
          </Link>
          <br />
          <button
            className="button-17"
            onClick={() => {
              post("/api/auth/logout");
            }}
          >
            Click me to Logout!
          </button>
        </div>
      </div>
      <div className="bgImage">
        {/* <img src={require("../images/general2.png").default}></img> */}
      </div>
    </>
  );
};

export default Home;
