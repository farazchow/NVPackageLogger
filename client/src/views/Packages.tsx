import React, { SyntheticEvent, useEffect, useState } from "react";
import { pckge } from "../../../server/models/package";
import { resident } from "../../../server/models/resident";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AddPackageForm } from "../components/AddPackageForm";
import PackagesTable from "../components/PackageTable";
import { get, post } from "../../utilities";

export const Packages = () => {
  const [data, setPackageData] = useState<pckge[]>([]);
  const [resData, setResidentData] = useState<resident[]>([]);
  const checkedIndexes = new Set<number>();

  // data fetching
  useEffect(() => {
    async function getData() {
      await Promise.all([
        get<pckge[]>("/api/package/getPackages").then((pckgs) =>
          setPackageData(pckgs)
        ),
        get<resident[]>("/api/resident/getResidents").then((residents) => {
          console.log("residents are", residents);
          setResidentData(residents);
        }),
      ]);

      console.log(resData);
    }
    getData();
  }, []);

  async function deliverOne(evt: SyntheticEvent, key: number) {
    const pckge = data[key];

    const body = {
      ...pckge,
      deliveredAt: new Date(),
    };

    post("/api/package/archivePackage", body).then((res) => {
      console.log("Package archived!");
      data.filter((pckg) => pckg.trackingNo !== body.trackingNo);
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
    "Carrier",
    "Tracking #",
    "Location",
    "TimeStamp",
    "Desk Worker",
    "Notes",
    "Deliver Package",
  ];

  return (
    <>
      <h2>Packages</h2>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header className="border-bottom">
              <h6 className="m-0">Packages</h6>
              <AddPackageForm residents={resData} />
            </Card.Header>
            <PackagesTable apiEndpoint={"/api/package/getPackages"} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Packages;
