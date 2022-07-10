import { FunctionComponent, useEffect, useState } from "react";
import NavBar from "./src/components/NavBar";
import Login from "./src/components/Login";

import { UserInterface } from "../server/models/user";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// require("react-bootstrap/lib/NavbarHeader");

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
    // <div>Home</div>
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/residents" element={<div>Residents</div>} />

        <Route path="package">
          <Route path="in" element={<div>Check In Package</div>} />
          <Route path="out" element={<div>Deliver Package</div>} />
        </Route>

        <Route path="/lend/items" element={<div>Lend Desk Items</div>} />
        <Route path="resident">
          <Route path="in" element={<div>Check In Resident</div>} />
          <Route path="out" element={<div>Check Out Resident</div>} />
        </Route>

        <Route path="/desk/workers" element={<div>Desk Workers</div>} />
        <Route path="/lost/items" element={<div>Lost Items</div>} />
      </Routes>

      <NavBar />
      <div className="container-fluid text-sm-center p-5 bg-light">
        <div className="flex justify-content-between">
          <NavBar />
          <div className="container">
            <h1 className="display-2">New Vassar Front Desk</h1>
            <Login />
            <p className="lead">Contributors: !</p>
          </div>
        </div>
      </div>
      {/* {fetch("/api/auth", { method: "post" })
        // .then((res: Response) => res.json())
        .then((resp: Response) => console.log(JSON.stringify(resp)))} */}
    </>

    // <>
    //   <br></br>

    //   <Nav fill variant="tabs" defaultActiveKey="/home">
    //     <Nav.Item>
    //       <Nav.Link href="#">Home</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="link-1">Log Packages Page</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="link-2">Lend Desk Item</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="disabled" disabled>
    //         Disabled
    //       </Nav.Link>
    //     </Nav.Item>
    //   </Nav>
    //   {/*  */}
    //   <Row>
    //     <Col>
    //       <Card className="mb-4">
    //         <CardHeader className="border-bottom">
    //           <h6 className="m-0">MongoDB Data</h6>
    //         </CardHeader>
    //         <Card.Body className="p-0 pb-3">
    //           <table data-size="small" className="table mb-0">
    //             <thead className="bg-light">
    //               <tr>
    //                 <th scope="col" className="border-0">
    //                   _id
    //                 </th>
    //                 <th scope="col" className="border-0">
    //                   Name
    //                 </th>
    //                 <th scope="col" className="border-0">
    //                   Time
    //                 </th>
    //                 <th scope="col" className="border-0">
    //                   __v
    //                 </th>
    //                 <th scope="col" className="border-0">
    //                   Notes
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {data ? (
    //                 data.map((user: any, key: number) => {
    //                   console.log("user is", user);
    //                   return (
    //                     <tr key={key}>
    //                       <td>{user._id}</td>
    //                       <td>{user.name}</td>
    //                       <td>{JSON.stringify(user.createdAt)}</td>
    //                       <td>{user.__v}</td>
    //                     </tr>
    //                   );
    //                 })
    //               ) : (
    //                 <tr>
    //                   <td align={"center"}>No data available</td>
    //                 </tr>
    //               )}

    //               {/* {data && data.length > 0 ? (
    //                 data &&
    //                 data.map((item, key) => {
    //                   return (
    //                     <tr key={key}>
    //                       <td>{key + 1}</td>
    //                       <td>{item.name}</td>
    //                       <td>{item.price}</td>
    //                       <td>
    //                         {item.notes ? ReactHtmlParser(item.notes) : "N/A"}
    //                       </td>
    //                       <td>
    //                         <i
    //                           className="material-icons edit-icon"
    //                           onClick={() => editOrder(key)}
    //                         >
    //                           edit
    //                         </i>
    //                         <i
    //                           className="material-icons delete-icon"
    //                           onClick={() => deleteOrder(key)}
    //                         >
    //                           delete
    //                         </i>
    //                       </td>
    //                     </tr>
    //                   );
    //                 })
    //               ) : (
    //                 <tr>
    //                   <td align={"center"}>
    //                     No data available
    //                   </td>
    //                 </tr>
    //               )} */}
    //             </tbody>
    //           </table>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   </Row>
    // </>
  );
};

export default App;
