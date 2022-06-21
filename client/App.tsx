import { useEffect, useState } from "react";

const App = () => {
  /*
   */
  const [data, setData] = useState("");

  // dummy load data for data fetching
  useEffect(() => {
    async function getData() {
      console.log("starting to fetch data");
      const result = await (await fetch("/api/auth")).text();
      console.log("data retrieved", result);
      // console.log("other result is", res);
      setData(result);
    }

    getData();
  }, []);

  return (
    <>
      <div>The beginning of a great react app! Data is: {data} | End</div>
    </>
  );
};

export default App;
