import { FunctionComponent, useEffect, useState } from "react";
import NavBar from "./src/components/NavBar";
import Login from "./src/components/Login";

import { user } from "../server/models/user";
import { Routes, Route } from "react-router-dom";

import NotFound from "./src/views/NotFound";
import Unauthorized from "./src/views/Unauthorizated";
import Home from "./src/views/Home";
import Packages from "./src/views/Packages";
import LendDeskItems from "./src/views/LendDeskItems";
import Catalog from "./src/views/Catalog";
import { CheckOutResident } from "./src/views/CheckOutResident";
import { CheckInResident } from "./src/views/CheckInResident";
import { SingleResidentView } from "./src/views/SingleResident";
import { DailyNotes } from "./src/views/Notes";
import { LostItems } from "./src/views/LostItems";
import PackageTable from "./src/components/PackageTable";

const App: FunctionComponent = () => {
  /*
   */
  const [data, setData] = useState<user[]>([]);

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
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/residents" element={<div>Residents</div>} />

        <Route path="/packages" element={<Packages />} />

        <Route path="/lend/items" element={<LendDeskItems />} />
        <Route path="resident">
          <Route path="out" element={<CheckOutResident />} />
          <Route path="in" element={<CheckInResident />} />
          <Route path="view/:id" element={<SingleResidentView />} />
        </Route>

        <Route path="/desk/workers" element={<div>Desk Workers</div>} />
        <Route path="/lost/items" element={<LostItems />} />

        <Route path="/notes" element={<DailyNotes />} />

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<div>Logout</div>} />

        <Route path="catalog">
          <Route
            path="pckges"
            element={<PackageTable apiEndpoint="/api/package/getPackages" />}
          />
          <Route path="desk-items" element={<LendDeskItems />} />
          <Route path="residents" element={<CheckInResident />} />
          <Route path="notes" element={<DailyNotes />} />

          <Route
            path="arch-pckges"
            element={
              <PackageTable apiEndpoint="/api/package/archived/getPackages" />
            }
          />
          <Route path="prev-residents" element={<h3>Previous Residents!</h3>} />
          <Route
            path="arch-notes"
            element={
              <>
                <h3>Archived Notes!</h3>
                <DailyNotes />
              </>
            }
          />
        </Route>

        <Route path="/notfound" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
};

export default App;
