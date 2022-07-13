import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import "../styles/App.css"
import CheckInOut from "./Resident";
import { Home } from "./Home";
import { LogPackages } from "./LogPackages";

import { DevUser } from "../server/models/user";

// require("react-bootstrap/lib/NavbarHeader");

const App = () => {
  /*
   */
  const [data, setData] = useState<DevUser[]>([]);

  // dummy load data for data fetching
  useEffect(() => {
    async function getData() {
      console.log("starting to fetch data");
      const result = await (await fetch("/api/auth")).json();

      console.log("data retrieved", result);
      // console.log("other result is", res);
      setData(result);
    }

    getData();
  }, []);
  return (
    <>
      <br></br>
      <div className="container-fluid text-sm-center p-5 bg-light">
        {/* <!-- bg-light is background color & p-5 is padding --> */}
        <h1 className="display-2">MIT Housing and Residential Services</h1>
        <p className="lead">Contributors: !</p>
      </div>
      <Router>
        <div>
          <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Link to="/">Home</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/logpackages">Log Packages Page</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/lenddesk">Lend Desk Item</Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item>
          </Nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/logpackages" element={<LogPackages />} />
            <Route path="/lenddesk" element={<LendDesk />} />
          </Routes>
        </div>
      </Router>
    </>
  );

  function LendDesk() {
    return <h2>LendDesk</h2>;
  }
};

export default App;
