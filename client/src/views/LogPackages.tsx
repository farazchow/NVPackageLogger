import React, { SyntheticEvent, useEffect, useState } from "react";
import { PackageInterface } from "../../../server/models/package";
import { IResident } from "../../../server/models/resident";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { PackageInputForm } from "../components/PackageInputForm";
import { get, post } from "../../utilities";

export function LogPackages() {
  const [data, setPackageData] = useState<PackageInterface[]>([]);
  const [resData, setResidentData] = useState<IResident[]>([]);
  var checkedIndexes = new Set<number>();

  // data fetching
  useEffect(() => {
    async function getData() {
      // fetch("/api/package/getPackages")
      //   .then((pack) => pack.json())
        
      //   .then((data) => setPackageData(data));
      
      get("/api/package/getPackages").then( (pckgs: any) => setPackageData(pckgs))
      get("/api/package/getResident").then( (residents: any) => setResidentData(residents))

      // fetch("/api/resident/getResident").then((res) =>
      //   res.json().then((resData) => setResidentData(resData)).then(()=>console.log(resData))
      // );
      
      // fetch("/api/resident/getResident").then(async (res) => {
      //   console.log('res is', await res.json()) }
      // );
      console.log(resData);
    }
    getData();
  }, []);

  async function deliverOne(evt: SyntheticEvent, key: number) {
    const pckage = data[key];
    const date = new Date();

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
    post("/api/package/archivePackage", body).then((res) => {
      console.log("Package archived!");
    });
    post("/api/package/deletePackage", body).then((res) => {
      console.log(`Package deleted from working db`);
      document.location.reload();
    });
  }

  async function deliverMany(evt: SyntheticEvent) {
    if (checkedIndexes.size === 0)
      window.alert(
        `There are no checked boxes you idiot. You buffoon. Who raised you? Do you think I exist just for you to laugh at? Well I don't. I have a soul. A family. And you spit on my kindness by making me deliver zero packages for your own amusement. Rethink your life before you ask me to do anything for you again.`
      );
    checkedIndexes.forEach((index) => {
      deliverOne(evt, index);
      checkedIndexes.delete(index);
    });
  }

  function onCheckboxClick(evt: SyntheticEvent, index: number) {
    if (checkedIndexes.has(index)) checkedIndexes.delete(index);
    else checkedIndexes.add(index);
  }

  return (
    <>
      <h2>LogPackages</h2>
      <Row>
        <Col>
          <Card className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">MongoDB Data</h6>
              <PackageInputForm
                user="temporary desk worker"
                residents={resData}
              />
              <button
                type="button"
                className="btn btn-dark"
                onClick={deliverMany}
              >
                Deliver Checked
              </button>
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
                          <td>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`checkbox-${key}`}
                              onClick={(evt) => {
                                onCheckboxClick(evt, key);
                              }}
                            />{" "}
                          </td>
                          <td>{pckage.recipient}</td>
                          <td>{pckage.shipper}</td>
                          <td>{pckage.shipping_id}</td>
                          <td>{pckage.location}</td>
                          <td>{pckage.createdAt}</td>
                          <td>{pckage.worker}</td>
                          <td>{pckage.notes}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-dark btn-sm d-flex justify-content-center"
                              onClick={(evt) => {
                                deliverOne(evt, key);
                              }}
                            >
                              Deliver
                            </button>
                          </td>
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
