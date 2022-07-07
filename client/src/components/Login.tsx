import "../css/login.css";

const Login = () => {
  return (
    <>
      <div id="login-card" className="container card">
        <div className="">
          <div className="text-center">Login</div>
          <br />

          <form action="/">
            <div className="form-group">
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
          <a href="#" className="signup">
            Signup
          </a>
          <a href="#" className="forgot-pswd">
            Forgot Password
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
