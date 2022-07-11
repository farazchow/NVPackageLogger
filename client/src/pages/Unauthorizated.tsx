import React from "react";

const Home = () => {
  return (
    <div
      className="u-flex u-flexColumn u-flex-justifyCenter u-flex-alignCenter u-center-container"
      style={{ color: "var(--white)" }}
    >
      <h1 className="u-header-text u-bold">404 Not Found</h1>
      <p className="u-letter-spacing" style={{ fontSize: "var(--xl)" }}>
        You are not authorized to access this page
      </p>
    </div>
  );
};

export default Home;
