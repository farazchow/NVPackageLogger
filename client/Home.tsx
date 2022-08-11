import React, { useEffect, useState, useCallback } from "react";
import { UserInterface } from "../server/models/user";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
// import SelectInput from "./SelectInput";
// import { PackageInputForm } from "./PackageInputForm";
import { PackageInterface } from "../server/models/package";
import "..css/universal.css";
export function Home() {
  const [data, setData] = useState<PackageInterface[]>([]);

  return (
    <Row>
      <Col>
        <Card className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">MongoDB Data</h6>
          </CardHeader>
          {/* {PackageInputForm()} */}
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
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
