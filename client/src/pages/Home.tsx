import { urlencoded } from "express";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { post } from "../../utilities";
import "../css/home.css";
const Home = () => {
  return (
    <>
      <div className="mainLogo">
        <div className="container">
          <h1 className="mainText">
            New Vassar Front Desk
            <img
              className="boxIcon"
              src={require("../images/box.svg").default}
            />
          </h1>
        </div>

        <p className="lead">Contributors: !</p>

        <div className="userButtons">
          <Link to="/login">
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
      <img
        className="nvOutline"
        src={require("../images/big_outline.png").default}
      />
    </>
  );
};

export default Home;
