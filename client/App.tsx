import { FunctionComponent, useEffect, useState } from "react";
import NavBar from "./src/components/NavBar";
import Login from "./src/components/Login";

import { UserInterface } from "../server/models/user";
import { Routes, Route } from "react-router-dom";

import NotFound from "./src/views/NotFound";
import Unauthorized from "./src/views/Unauthorizated";
import Home from "./src/views/Home";
import LogPackages from "./src/views/LogPackages";
import LendDeskItems from "./src/views/LendDeskItems";
import { CheckInResident } from "./src/views/CheckInResident";
import { CheckOutResident } from "./src/views/CheckOutResident";
import { SingleResidentView } from "./src/views/SingleResident";
import { DailyNotes } from "./src/views/Notes";

const App: FunctionComponent = () => {
  /*
   */
  const [data, setData] = useState<UserInterface[]>([]);

  // dummy load data for data fetching
  useEffect(() => {
    async function getData() {
      console.log("starting to fetch data");
      // const result = await (await fetch("/api/auth")).json();
      const result = "dummy data!";

      console.log("data retrieved", result);
      // console.log("other result is", res);
      // setData(result);
    }

    getData();
  }, []);
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/residents" element={<div>Residents</div>} />

        <Route path="/package" element={<LogPackages />} />

        <Route path="/lend/items" element={<LendDeskItems />} />
        <Route path="resident">
          <Route path="in" element={<CheckInResident />} />
          <Route path="out" element={<CheckOutResident />} />
          <Route path="view/:id" element={<SingleResidentView />} />
        </Route>

        <Route path="/desk/workers" element={<div>Desk Workers</div>} />
        <Route path="/lost/items" element={<div>Lost Items</div>} />

        <Route path="/notes" element={<DailyNotes />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<div>Logout</div>} />

        <Route path="/notfound" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
};

export default App;
