import { useEffect, useState } from "react";
import { post } from "../../utilities";
import "../css/login.css";

const Login = () => {
  const [signup, setSignup] = useState(false);

  useEffect(() => {}, [signup]);

  const handleSubmit = async () => {
    return await (signup
      ? post("/signup", {
          email: "test@gmail.com",
          username: "username here!",
        })
      : post("/login", {
          email: "test@gmail.com",
          username: "username here!",
        }));
  };

  return (
    <>
      <div id="login-card" className="container card">
        <div className="">
          <div className="text-center">Login</div>
          <br />

          <form
            action={`/api/auth/${signup ? "signup" : "login"}`}
            method="post"
          >
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="First Name"
                name="firstName"
                style={{ display: signup ? "block" : "none" }}
              ></input>
              <input
                type="text"
                className="form-control"
                id="lname"
                placeholder="Last Name"
                name="lastName"
                style={{ display: signup ? "block" : "none" }}
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
            <button
              type="submit"
              id="submit-btn"
              className="btn submit"
              onSubmit={handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="flex container">
          <span
            onClick={() => {
              setSignup(!signup);
            }}
            className="signup"
          >
            Signup
          </span>
          <span className="forgot-pswd">Forgot Password</span>
        </div>
      </div>
    </>
  );
};

export default Login;
