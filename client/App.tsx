import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
// import "../styles/App.css"
import { Home } from "./Home";
import { LogPackages } from "./LogPackages";
import { CheckInOut } from "./Resident";

// require("react-bootstrap/lib/NavbarHeader");

const App = () => {
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
           <Link to="/checkinout">Resident Check-in/Check-out</Link>
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
          <Route path="/" element={<Home />}/>
          <Route path="/logpackages" element={<LogPackages />}/>
          <Route path="/lenddesk" element={<LendDesk />}/>
          <Route path="/checkinout" element={<CheckInOut />}/>
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