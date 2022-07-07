import React, { useEffect, useState } from "react";
import { IPackage } from "../server/models/package";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";

export function LogPackages() {

    const [data, setData] = useState<IPackage[]>([]);

  // dummy load data for data fetching
  useEffect(() => {
    async function getData() {
      console.log("starting to fetch data");
      const result = await (await fetch("/api/package")).json();

      console.log("data retrieved", result);
      // console.log("other result is", res);
      setData(result);
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
                    Name
                    </th>
                    <th scope="col" className="border-0">
                    Recipient
                    </th>
                    <th scope="col" className="border-0">
                    Time
                    </th>
                </tr>
                </thead>
                <tbody>
                {data ? (
                    data.map((pckage: any, key: number) => {
                    return (
                        <tr key={key}>
                        <td>{pckage.name}</td>
                        <td>{pckage.recipient}</td>
                        <td>{JSON.stringify(pckage.createdAt)}</td>
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
    )
  }