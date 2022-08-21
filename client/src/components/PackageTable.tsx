import React, { useEffect, useState, SyntheticEvent } from "react";
import { Card } from "react-bootstrap";
import { emptyPackage, pckge } from "../../../server/models/package";
import { get, post } from "../../utilities";

type PackageTableProps = {
  apiEndpoint: RequestInfo | URL;
  params?: Record<any, any>;
  showHeaders?: boolean;
};
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

const PackageTable = ({
  apiEndpoint,
  params = {},
  showHeaders = true,
}: PackageTableProps) => {
  const [packages, setPackages] = useState<pckge[]>([emptyPackage]);
  const checkedIndexes = new Set<number>();

  useEffect(() => {
    get<pckge[]>(apiEndpoint, params).then((packages) => setPackages(packages));
  }, []);

  async function deliverOne(evt: SyntheticEvent, key: number) {
    const pckge = packages[key];

    const body = {
      ...pckge,
      deliveredAt: new Date(),
    };

    post("/api/package/archivePackage", body).then((res) => {
      console.log("Package archived!");
      packages.filter((pckg) => pckg.trackingNo !== body.trackingNo);
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

  return (
    <>
      <Card className="mb-4">
        {showHeaders ? (
          <Card.Header className="border-bottom">
            <button
              type="button"
              className="btn btn-dark"
              onClick={deliverMany}
            >
              Deliver Checked
            </button>
          </Card.Header>
        ) : (
          <></>
        )}
        <Card.Body className="p-0 pb-3">
          <>
            <table data-size="small" className="table mb-0">
              <tbody>
                {/* <thead> */}
                <tr className="bg-light">
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
                {/* </thead> */}
                {packages.length ? (
                  packages.map((pckge, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`checkbox-${index}`}
                          onClick={(evt) => {
                            toggleCheckbox(evt, index);
                          }}
                        />
                      </td>
                      <td>{pckge.recipient}</td>
                      <td>{pckge.carrier}</td>
                      <td>{pckge.trackingNo}</td>
                      <td>{pckge.location}</td>
                      <td>
                        {pckge.receivedAt ? pckge.receivedAt.toString() : ""}
                      </td>
                      <td>{pckge.loggedBy}</td>
                      <td>
                        {pckge.notes ? (
                          pckge.notes
                        ) : (
                          <a href="/">Add a Note!</a>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-dark btn-sm d-flex justify-content-center"
                          onClick={(evt) => {
                            document
                              .getElementById(`checkbox-${index}`)
                              ?.click();
                            deliverOne(evt, index);
                          }}
                        >
                          Deliver
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </table>
            {(function () {
              if (!packages.length) {
                return (
                  <div className="text-center">
                    <br />
                    No Packages!
                    <div>If you think this is an error, please contact us.</div>
                  </div>
                );
              }
              return;
            })()}
          </>
        </Card.Body>
      </Card>
    </>
  );
};

export default PackageTable;
