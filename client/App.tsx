import React, { JSXElementConstructor, useEffect } from "react";
const App = () => {
  /*
   */
  let data = "";

  // dummy load data for data fetching
  useEffect(() => {
    fetch("http://localhost:3001/api").then(() => {
      console.log("yay data fetched! server is up and running");
    });
  });

  return (
    <>
      <div>The beginning of a great react app! Data is:{data} | End</div>
    </>
  );
};

export default App;
