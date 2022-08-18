import React, { SyntheticEvent, useEffect, useState } from "react";
import { PackageInterface } from "../../../server/models/package";
import { resident } from "../../../server/models/resident";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { PackageInputForm } from "../components/PackageInputForm";
import { get, post } from "../../utilities";

export const LogPackages = () => {
  const [data, setPackageData] = useState<PackageInterface[]>([]);
  const [resData, setResidentData] = useState<resident[]>([]);
  const checkedIndexes = new Set<number>();

  // data fetching
  useEffect(() => {
    async function getData() {
      await Promise.all([
        get("/api/package/getPackages").then((pckgs: any) =>
          setPackageData(pckgs)
        ),
        get("/api/resident/getResidents").then((residents: any) => {
          console.log("residents are", residents);
          setResidentData(residents);
        }),
      ]);

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
      // document.location.reload();
      document.getElementById(`checkbox-${key}`)?.click();

      setPackageData(data.filter((pckg) => pckg.createdAt !== body.createdAt));
    });
  }

  async function deliverMany(evt: SyntheticEvent) {
    if (!checkedIndexes.size)
      return alert(
        `There are no checked boxes you idiot. You buffoon. Who raised you? Do you think I exist just for you to laugh at? Well I don't. I have a soul. A family. And you spit on my kindness by making me deliver zero packages for your own amusement. Rethink your life before you ask me to do anything for you again.`
      );
    checkedIndexes.forEach((index) => {
      deliverOne(evt, index);
    });
  }

  function toggleCheckbox(evt: SyntheticEvent, index: number) {
    if (checkedIndexes.has(index)) checkedIndexes.delete(index);
    else checkedIndexes.add(index);
  }

  const headers = [
    "Select",
    "Recipient",
    "Shipper",
    "Shipping ID",
    "Location",
    "Time",
    "Worker",
    "Notes",
    "Deliver Package",
  ];

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
                    {headers.map((header, ind) => (
                      <th
                        key={ind}
                        scope="col"
                        className={
                          ind !== header.length ? "border-0" : "border-end"
                        }
                      >
                        {header}
                      </th>
                    ))}
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
                                toggleCheckbox(evt, key);
                              }}
                            />
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
                                document
                                  .getElementById(`checkbox-${key}`)
                                  ?.click();
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
};

export default LogPackages;
