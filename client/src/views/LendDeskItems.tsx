import React, { SyntheticEvent, useEffect, useState } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { LendDeskItemsForm } from "../components/LendDeskItemsForm";
import { AddDeskItemsForm } from "../components/AddDeskItemsForm";
import { IResident } from "../../../server/models/resident";
import { ModalButton } from "../components/ModalButton";
import { get, post } from "../../utilities";
import { createBootstrapComponent } from "react-bootstrap/esm/ThemeProvider";

enum Categories {
  CLEANING = "Cleaning",
  WHEELS = "Wheels",
  TOOLS = "Tools",
  GAMES = "Games",
  SPORTS = "Sports Equipment",
  KEYS = "Keys",
  MOVIES = "Movies",
  OTHER = "Other",
}

type DeskItemDictionary = {
  [x: string]: DeskItemInterface[];
};

export function LendDeskItems() {
  const [data, setData] = useState<DeskItemInterface[]>([]);
  const [availableItems, setAvailableItems] = useState<DeskItemDictionary>({});
  const [resData, setResidentData] = useState<IResident[]>([]);

  // data fetching
  useEffect(() => {
    async function getData() {
      Object.values(Categories).forEach((cat: Categories) => {
        get("/api/deskItem/getCategoryAvailableItems", {
          itemCategory: cat,
        }).then((item: any) =>
          setAvailableItems((availableItems: DeskItemDictionary) => {
            availableItems[cat] = item;
            return availableItems;
          })
        );
      });
      await Promise.all([
        get("/api/deskItem/getAllItems").then((item: any) => {
          setData(item);
        }),

        get("/api/resident/getResident").then((residents: any) => {
          setResidentData(residents);
        }),
      ]);
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
      document.location.reload();
      console.log("desk Item returned");
      // document.location.reload();
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
              {
                <LendDeskItemsForm
                  availableItems={availableItems}
                  residents={resData}
                  categories={Object.values(Categories)}
                />
              }
              {ModalButton(
                <AddDeskItemsForm
                  currentItems={data}
                  categories={Object.values(Categories)}
                />,
                "Add Item"
              )}
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
                          <td>
                            <button
                              className="btn btn-dark btn-sm d-flex justify-content-center"
                              onClick={() =>
                                post("/api/deskItem/delete/desk-item", {
                                  _id: item._id,
                                })
                              }
                            >
                              Delete Item!
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
