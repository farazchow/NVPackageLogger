import React, { useEffect, useState, useCallback } from "react";
import { DevUser } from "../server/models/user";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import SelectInput from "./SelectInput";
import { PackageInputForm } from "./PackageInputForm";
import { DevPackage } from "../server/models/package";

export function Home() {
  const [data, setData] = useState<DevPackage[]>([]);

  return (
    <Row>
      <Col>
        <Card className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">MongoDB Data</h6>
          </CardHeader>
          {PackageInputForm()}
          <Card.Body className="p-0 pb-3">
            <table data-size="small" className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    _id
                  </th>
                  <th scope="col" className="border-0">
                    Name
                  </th>
                  <th scope="col" className="border-0">
                    Time
                  </th>
                  <th scope="col" className="border-0">
                    __v
                  </th>
                  <th scope="col" className="border-0">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {data ? (
                  data.map((user: any, key: number) => {
                    console.log("user is", user);
                    return (
                      <tr key={key}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{JSON.stringify(user.createdAt)}</td>
                        <td>{user.__v}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td align={"center"}>No data available</td>
                  </tr>
                )}

                {/* {data && data.length > 0 ? (
                    data &&
                    data.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>
                            {item.notes ? ReactHtmlParser(item.notes) : "N/A"}
                          </td>
                          <td>
                            <i
                              className="material-icons edit-icon"
                              onClick={() => editOrder(key)}
                            >
                              edit
                            </i>
                            <i
                              className="material-icons delete-icon"
                              onClick={() => deleteOrder(key)}
                            >
                              delete
                            </i>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td align={"center"}>
                        No data available
                      </td>
                    </tr>
                  )} */}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

// const [data, setData] = useState<DevUser[]>([]);

// // dummy load data for data fetching
// useEffect(() => {
//   async function getData() {
//     console.log("starting to fetch data");
//     const result = await (await fetch("/api/auth")).json();

//     console.log("data retrieved", result);
//     // console.log("other result is", res);
//     setData(result);
//   }

//   getData();
// }, []);

// return (
//   <Row>
//     <Col>
//       <Card className="mb-4">
//         <CardHeader className="border-bottom">
//           <h6 className="m-0">MongoDB Data</h6>
//         </CardHeader>
//         <PackageInputForm />
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
//                   data &&
//                   data.map((item, key) => {
//                   return (
//                       <tr key={key}>
//                       <td>{key + 1}</td>
//                       <td>{item.name}</td>
//                       <td>{item.price}</td>
//                       <td>
//                           {item.notes ? ReactHtmlParser(item.notes) : "N/A"}
//                       </td>
//                       <td>
//                           <i
//                           className="material-icons edit-icon"
//                           onClick={() => editOrder(key)}
//                           >
//                           edit
//                           </i>
//                           <i
//                           className="material-icons delete-icon"
//                           onClick={() => deleteOrder(key)}
//                           >
//                           delete
//                           </i>
//                       </td>
//                       </tr>
//                   );
//                   })
//               ) : (
//                   <tr>
//                   <td align={"center"}>
//                       No data available
//                   </td>
//                   </tr>
//               )} */}
//             </tbody>
//           </table>
//         </Card.Body>
//       </Card>
//     </Col>
//   </Row>
// );
