import { Link } from "react-router-dom";
import { post } from "../../utilities";

const Home = () => {
  return (
    <>
      <div className="container-fluid text-sm-center p-5 bg-light">
        <div className="container">
          <h1 className="display-2">New Vassar Front Desk</h1>
          <p className="lead">Contributors: !</p>
        </div>
        <div>
          <Link to="/login">Login Here</Link>
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
