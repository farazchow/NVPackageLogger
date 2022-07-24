import React, { SyntheticEvent, useEffect, useState } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { LendDeskItemsForm } from "../components/LendDeskItemsForm";
import { AddDeskItemsForm } from "../components/AddDeskItemsForm";
import { get, post } from "../../utilities";

export function LendDeskItems() {
  const [data, setData] = useState<DeskItemInterface[]>([]);

  // data fetching
  useEffect(() => {
    async function getData() {
      fetch("/api/deskItem/getAllItems")
        .then((res) => res.json())
        .then((data) => setData(data));
    }
    getData();
  }, []);

  async function returnItem(evt: SyntheticEvent, key: number) {
    const item = data[key];
    const date = new Date();

    const body = {
      _id: item._id,
      residentId: item.currentStatus,
      borrowedAt: item.lastBorrowed,
      returnedAt: date,
      notes: "Temp filler for notes", // add pop-up requesting notes
    };

    post("/api/deskItem/returnItem", body).then((res) => {
      console.log("desk Item returned");
      document.location.reload();
    });
  }

  return (
    <>
      <h2>Lend Desk Item</h2>
      <Row>
        <Col>
          <Card className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Lend Items</h6>
              {LendDeskItemsForm()}
              <h6 className="m-0">Add Item</h6>
              {AddDeskItemsForm()}
            </CardHeader>
            <Card.Body className="p-0 pb-3">
              <table data-size="small" className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Item Name
                    </th>
                    <th scope="col" className="border-0">
                      Current Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.map((item: any, key: number) => {
                      return (
                        <tr key={item._id}>
                          <td>{item.itemName}</td>
                          <td>
                            {item.currentStatus == "Available"
                              ? item.currentStatus
                              : "Lent to " +
                                item.currentStatus +
                                " on " +
                                item.lastBorrowed}
                          </td>
                          <td>
                            <button
                              type="button"
                              id="returnItemButton"
                              className="btn btn-dark btn-sm d-flex justify-content-center"
                              onClick={(evt) => {
                                returnItem(evt, key); // todo: disable button after item is returned
                              }}
                            >
                              Return Item
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

export default LendDeskItems;
