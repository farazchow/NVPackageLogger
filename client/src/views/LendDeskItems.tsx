import { Component, SyntheticEvent, useEffect, useState } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
// import { LendDeskItemsForm } from "../components/LendDeskItemsForm";
import { AddDeskItemsForm } from "../components/AddDeskItemsForm";
import { LendDeskItemsForm } from "../components/LendDeskItemsForm";
import { resident } from "../../../server/models/resident";
import { ModalButton } from "../components/ModalButton";
import { get, post } from "../../utilities";
// import "../css/lendDeskItems.css";

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

enum SHOW {
  AVAILABLE = "Available Items",
  BORROWED = "Borrowed Items",
  ALL = "All Items",
}

export function LendDeskItems() {
  const [alldeskItems, setAllDeskItems] = useState<DeskItemInterface[]>([]);
  const [itemsOut, setItemsOut] = useState<DeskItemInterface[]>([]);
  const [itemsIn, setItemsIn] = useState<DeskItemInterface[]>([]);

  useEffect(() => {
    get("/api/deskItem/getAllItems").then((allItems: any) => {
      console.log("items are", allItems);
      setAllDeskItems(allItems);

      setItemsOut(
        allItems
          .filter(
            (item: DeskItemInterface) => item.currentStatus !== "Available"
          )
          .sort((item: DeskItemInterface) => item.itemCategory)
      );

      setItemsIn(
        allItems
          .filter(
            (item: DeskItemInterface) => item.currentStatus === "Available"
          )
          .sort((item: DeskItemInterface) => item.itemCategory)
      );
    });
  }, []);

  useEffect(() => {
    console.log("desk items updated", alldeskItems);
  }, [alldeskItems]);

  async function returnItem(evt: SyntheticEvent, item: DeskItemInterface) {
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
    });
  }

  const lendItem = async (
    LendDeskItemsFormvt: SyntheticEvent,
    item: DeskItemInterface
  ) => {
    const date = new Date();

    const body = {
      itemId: item._id,
      residentId: item.currentStatus,
      borrowedAt: item.lastBorrowed,
      returnedAt: date,
      notes: "Temp filler for notes", // add pop-up requesting notes
    };
    console.log("body is", body);
    post("/api/deskItem/lendItem", body).then((res) => {
      // setAllDeskItems(() => ({ ...alldeskItems }));
      document.location.reload();
      console.log("desk Item lent!");
    });
  };

  const filterData = (value: string) => {
    setItemsOut(
      alldeskItems.filter(
        (item: DeskItemInterface) =>
          item.currentStatus !== "Available" &&
          item.itemName
            .toLowerCase()
            .trim()
            .startsWith(value.toLowerCase().trim())
      )
    );
    setItemsIn(
      alldeskItems.filter(
        (item: DeskItemInterface) =>
          item.currentStatus === "Available" &&
          item.itemName
            .toLowerCase()
            .trim()
            .startsWith(value.toLowerCase().trim())
      )
    );
    console.log("set both");
  };

  useEffect(() => {
    console.log("items in changed", itemsIn);
  }, [itemsIn]);
  useEffect(() => {
    console.log("items out changed", itemsOut);
  }, [itemsOut]);
  return (
    <>
      <h2>Lend Desk Item</h2>
      <input
        type="text"
        onChange={(event: SyntheticEvent) =>
          filterData(
            (event.target as HTMLInputElement).value
            // (document.getElementById("selectOption") as HTMLInputElement).value
          )
        }
      />
      <Row>
        <Col>
          <Card className="mb-4">
            <CardHeader className="border-bottom">
              {
                <ModalButton
                  form={
                    <AddDeskItemsForm
                      currentItems={alldeskItems}
                      categories={Object.values(Categories)}
                    />
                  }
                  title="Add/Edit Item"
                />
              }
            </CardHeader>
            <Card.Body className="p-0 pb-3">
              <table data-size="small" className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Item Name
                    </th>
                    <th scope="col" className="border-0">
                      Item Category
                    </th>
                    <th scope="col" className="border-0">
                      Current Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {alldeskItems ? (
                    <>
                      {itemsIn.map((item: any) => (
                        <>
                          <tr key={item._id}>
                            <td>{item.itemName}</td>
                            <td>{item.itemCategory}</td>
                            <td>{item.currentStatus}</td>
                            <td>
                              <button
                                type="button"
                                id="returnItemButton"
                                className="btn btn-dark btn-sm d-flex justify-content-center"
                                onClick={(evt) => {
                                  lendItem(evt, item); // todo: disable button after item is returned
                                }}
                              >
                                Lend Item
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}

                      {itemsOut.map((item: any) => (
                        <>
                          <tr key={item._id}>
                            <td>{item.itemName}</td>
                            <td>{item.itemCategory}</td>
                            <td>
                              {"Lent to " +
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
                                  returnItem(evt, item); // todo: disable button after item is returned
                                }}
                              >
                                Return Item
                              </button>
                            </td>
                          </tr>
                        </>
                      ))}
                    </>
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
