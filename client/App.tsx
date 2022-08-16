import { FunctionComponent, useEffect, useState } from "react";
import NavBar from "./src/components/NavBar";
import Login from "./src/components/Login";

import { user } from "../server/models/user";
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
import { LostItems } from "./src/views/LostItems";
import { AuthProvider, ProtectedRoute } from "./src/auth/useAuth";

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
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route element={<ProtectedRoute />}>
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
            <Route path="/lost/items" element={<LostItems />} />

            <Route path="/notes" element={<DailyNotes />} />

            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<div>Logout</div>} />
          </Route>

          <Route path="/notfound" element={<NotFound />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

// useEffect( () => {
//   await get("/Session").then((res: any) => console.log("get finished!", res))
//   await post("/Session").then((res: any) => console.log("post finished!", res))
//   await get("/Shibboleth.sso/Login").then((res: any) => console.log("get shib finished!", res))
//   await post("/Shibboleth.sso/Logout").then((res: any) => console.log("post shib finished!", res))
// }, [])

// <button onClick={() => post("/Session")}>Post Logout</button>;
// <button onClick={() => get("/Session")}>Get Logout</button>;
// <a href="/Session">Shib Session</a>
// <a href="/Shibboleth.sso/Login">Shib Login</a>
// <a href="/Shibboleth.sso/Logout"> Shib Logout</a>

<button
  onClick={() => (window.location.href = "https://nvdesk.mit.edu/Session")}
/>;

export default App;
