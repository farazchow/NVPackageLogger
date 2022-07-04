import { Nav, NavLink } from "react-bootstrap";
// import "./landing.css";
import "../css/utilities.css";

const userLoggedIn = true;

const Landing = () => {
  return (
    <>
      <h1
        style={{
          fontSize: "6rem",
          fontWeight: "600",
          marginBottom: "2rem",
          lineHeight: "1em",
          color: "#ececec",
          textTransform: "lowercase",
          textAlign: "center",
        }}
      >
        todos
      </h1>
      <nav className="u-bold">
        {" "}
        MIT Housing & Residence Services
        <ul>
          <a href="#">Home</a>
        </ul>
        <ul>
          <a href="#">Profile</a>
        </ul>
        <ul>
          <a href="#">Residents</a>
        </ul>
        <ul>
          <a href="#">Check In Package</a>
        </ul>
        <ul>
          <a href="#">Deliver Package</a>
        </ul>
        <ul>
          <a href="#">Lend Desk Items</a>
        </ul>
        <ul>
          <a href="#">Check In Resident</a>
        </ul>
        <ul>
          <a href="#">Check Out Resident</a>
        </ul>
        <ul>
          <a href="#">Desk Workers</a>
        </ul>
        <ul>
          <a href="#">Lost Items</a>
        </ul>
      </nav>
    </>
  );
};

export default Landing;
