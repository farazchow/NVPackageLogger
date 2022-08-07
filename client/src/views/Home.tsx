import { Link } from "react-router-dom";
import { post } from "../../utilities";

const Home = () => {
  return (
    <>
      <div className="container-fluid text-sm-center p-5 bg-light">
        <div className="container">
          <h1 className="mainText">
            New Vassar Front Desk
            {/* <img
              className="boxIcon"
              src={require("../images/box.svg").default}
            /> */}
          </h1>
        </div>
        <div>
          <button
            className="button-17"
            onClick={() => {
              post("/Shibboleth.sso/Login/");
            }}
          >
            Login
          </button>
          <br />
          <button
            onClick={() => {
              post("/api/auth/logout");
            }}
          >
            Click me to Logout!
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
