import React, { useEffect, useState } from "react";
import { PackageInterface } from "../../../server/models/package";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";

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
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.map((pckage: any, key: number) => {
                      return (
                        <tr key={key}>
                          <td>{pckage.recipient}</td>
                          <td>{pckage.shipper}</td>
                          <td>{pckage.shipping_id}</td>
                          <td>{pckage.location}</td>
                          <td>{pckage.createdAt}</td>
                          <td>{pckage.worker}</td>
                          <td>{pckage.notes}</td>
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

export default LogPackages;
