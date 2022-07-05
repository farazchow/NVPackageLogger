import { Link } from "react-router-dom";
import { Nav, NavLink } from "react-bootstrap";
// import "./landing.css";
import "../../utilities.css";

const userLoggedIn = true;
const navigations = [
  { path: "/", info: "Home" },
  { path: "/profile", info: "Profile" },
  { path: "/package/in", info: "Check In Package" },
  { path: "/package/out", info: "Deliver Package" },
  { path: "/lend/items", info: "Lend Desk Items" },
  { path: "/resident/in", info: "Check In Resident" },
  { path: "/resident/out", info: "Check Out Resident" },
  { path: "/desk/workers", info: "Desk Workers" },
  { path: "/lost/items", info: "Lost Items" },
];

const Landing = () => {
  return (
    <>
      <header className="py-3 mb-4 border-bottom shadow">
        <div className="container-fluid align-items-center d-flex">
          <div className="flex-shrink-1">
            <a
              href="#"
              className="d-flex align-items-center col-lg-4 mb-2 mb-lg-0 link-dark text-decoration-none"
            >
              <i className="bi bi-bootstrap fs-2 text-dark"></i>
            </a>
          </div>
          <div className="flex-grow-1 d-flex align-items-center">
            <form className="w-100 me-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
              />
            </form>
            <div className="flex-shrink-0 dropdown">
              <a
                href="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser2"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <img
                  src="https://via.placeholder.com/28?text=!"
                  alt="user"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end shadow"
                aria-labelledby="dropdownUser2"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    New project...
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <div className="container-fluid pb-3 flex-grow-1 d-flex flex-column flex-sm-row overflow-auto">
        <div className="row flex-grow-sm-1 flex-grow-0">
          <div className="flex-grow-sm-1 flex-grow-0 sticky-top pb-sm-0 pb-3">
            <div className="bg-light border rounded-3 p-1 h-100 sticky-top">
              <ul className="nav nav-pills flex-sm-column flex-row mb-auto justify-content-between text-truncate">
                {navigations.map((nav: { path: string; info: string }) => {
                  return (
                    <li className="nav-item" key={nav.path + nav.info}>
                      <Link
                        className="nav-link px-2 text-truncate"
                        to={nav.path}
                      >
                        {nav.info}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
