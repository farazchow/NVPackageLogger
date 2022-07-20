import React, { SyntheticEvent, useEffect, useState } from "react";
import { PackageInterface } from "../server/models/package";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { post } from "../src/utilities";

export function LogPackages() {
  const [data, setData] = useState<PackageInterface[]>([]);

  // data fetching
  useEffect(() => {
    async function getData() {
      fetch("/api/package/getPackages")
        .then((res) => res.json())
        .then((data) => setData(data));
    }
    getData();
  }, []);


  async function deliverOne(evt: SyntheticEvent, key: number) {
    const pckage = data[key];
    const date = new Date;

    const body = {
      shipping_id: pckage.shipping_id,
      shipper: pckage.shipper,
      location: pckage.location,
      notes: pckage.notes,
      recipient: pckage.recipient,      
      workerIn: pckage.workerIn,
      workerOut: "temporaryWorkerOut",
      createdAt: pckage.createdAt,
      deliveredAt: date,
    };

    post("/api/package/deletePackage", body)
      .then((res) => {console.log(`Package deleted from working db`)});
    post("/api/package/archivePackage", body)
      .then((res) => console.log("Package archived!"));
  }

  return (
    <>
      <h2>LogPackages</h2>
      <Row>
        <Col>
          <Card className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">MongoDB Data</h6>
            </CardHeader>
            <Card.Body className="p-0 pb-3">
              <table data-size="small" className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Select
                    </th>
                    <th scope="col" className="border-0">
                      Recipient
                    </th>
                    <th scope="col" className="border-0">
                      Shipper
                    </th>
                    <th scope="col" className="border-0">
                      Shipping ID
                    </th>
                    <th scope="col" className="border-0">
                      Location
                    </th>
                    <th scope="col" className="border-0">
                      Time
                    </th>
                    <th scope="col" className="border-0">
                      Worker
                    </th>
                    <th scope="col" className="border-0">
                      Notes
                    </th>
                    <th scope="col" className="border-end">
                      Deliver Package
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.map((pckage: any, key: number) => {
                      return (
                        <tr key={key}>
                          <input type="checkbox"/>
                          <td>{pckage.recipient}</td>
                          <td>{pckage.shipper}</td>
                          <td>{pckage.shipping_id}</td>
                          <td>{pckage.location}</td>
                          <td>{pckage.createdAt}</td>
                          <td>{pckage.worker}</td>
                          <td>{pckage.notes}</td>
                          <button type="button" className="btn btn-outline-dark btn-sm d-flex justify-content-center" onClick={evt => {deliverOne(evt, key)}}>Deliver</button>
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
    </>
  );
}
