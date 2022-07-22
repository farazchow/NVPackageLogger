import { Link } from "react-router-dom";
import "../../utilities.css";
import "../css/navbar.css";

const navigations = [
  { path: "/", info: "Home" },
  { path: "/profile", info: "Profile" },
  { path: "/package", info: "Packages" },
  { path: "/lend/items", info: "Lend Desk Items" },
  { path: "/resident/in", info: "Check In Resident" },
  { path: "/resident/out", info: "Check Out Resident" },
  { path: "/notes", info: "Notes" },
  { path: "/desk/workers", info: "Desk Workers" },
  { path: "/lost/items", info: "Lost Items" },
];

const Landing = () => {
  return (
    <>
      <div className="navBar">
        <div className="bg-light border rounded-3 p-1 h-100 sticky-top">
          <ul className="nav nav-pills flex-sm flex-row mb-auto justify-content-between text-truncate">
            {navigations.map((nav: { path: string; info: string }) => {
              return (
                <li className="nav-item" key={nav.path + nav.info}>
                  <Link className="nav-link px-2 text-truncate" to={nav.path}>
                    {nav.info}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Landing;
