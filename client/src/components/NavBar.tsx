import { Link } from "react-router-dom";
import "../../utilities.css";

const navigations = [
  { path: "/", info: "Home" },
  { path: "/profile", info: "Profile" },
  { path: "/package", info: "Package" },
  { path: "/package/in", info: "Check In Package" },
  { path: "/package/out", info: "Deliver Package" },
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
      <br />
      <div className="container-fluid ">
        <div className="flex-grow-sm-1 flex-grow-0 sticky-top pb-sm-0 pb-3">
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
      </div>
      <br />
    </>
  );
};

export default Landing;
