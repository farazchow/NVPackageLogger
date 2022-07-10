import React from "react";

const NotFound = () => {
  return (
    <div
      className="u-flex u-flexColumn u-flex-justifyCenter u-flex-alignCenter u-center-container"
      style={{ color: "var(--white)" }}
    >
      <h1 className="u-header-text u-bold">404 Not Found</h1>
      <p className="u-letter-spacing" style={{ fontSize: "var(--xl)" }}>
        The page you requested couldn't be found.
      </p>
    </div>
  );
};

export default NotFound;
