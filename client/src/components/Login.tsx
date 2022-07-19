import { ReactElement, useState } from "react";
import { post } from "../../utilities";
import "../css/login.css";

interface Props {
  props?: any;
}

const Login = (props: Props): ReactElement => {
  const [login, setLogin] = useState(true);

  return (
    <>
      <div id="login-card" className="container card">
        <div className="">
          <div className="text-center">Login</div>
          <br />

          <form
            action={`/api/auth/${login ? "login" : "signup"}`}
            method="post"
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="First Name"
                name="firstName"
                style={{ display: login ? "none" : "block" }}
              ></input>
              <input
                type="text"
                className="form-control"
                id="lname"
                placeholder="Last Name"
                name="lastName"
                style={{ display: !login ? "block" : "none" }}
              ></input>

              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
              ></input>
              <br />
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                name="password"
              ></input>
            </div>
            <br />
            <button type="submit" id="submit-btn" className="btn submit">
              Submit
            </button>
          </form>
        </div>
        <div className="flex container">
          <span
            onClick={() => {
              setLogin(!login);
            }}
            className="signup"
          >
            {login ? "Signup" : "Login"}
          </span>
          <span className="forgot-pswd">Forgot Password</span>
        </div>
      </div>
    </>
  );
};

export default Login;
