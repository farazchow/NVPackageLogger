import { Component, SyntheticEvent, useEffect, useState } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
// import { LendDeskItemsForm } from "../components/LendDeskItemsForm";
import { AddDeskItemsForm } from "../components/AddDeskItemsForm";
import { LendDeskItemsForm } from "../components/LendDeskItemsForm";
import { IResident } from "../../../server/models/resident";
import { ModalButton } from "../components/Modal";
import { get, post } from "../../utilities";
import "../css/lendDeskItems.css";

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
  const [allItems, setAllItems] = useState<DeskItemInterface[]>([]);
  const [borrowedItems, setBorrowedItems] = useState<DeskItemInterface[]>([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [residentData, setResidentData] = useState<IResident[]>([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showItems, setShowItems] = useState<DeskItemInterface[]>([]);

  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    async function getData() {
      await Promise.all([
        get("/api/deskItem/getAllItems").then((item: any) => {
          setAllItems(item);
          setShowItems(item);
        }),

        get("/api/deskItem/getAvailableItems").then((item: any) => {
          setFilteredItems(item);
          setAvailableItems(item);
        }),

        get("/api/deskItem/getBorrowedItems").then((item: any) => {
          setBorrowedItems(item);
        }),

        get("/api/resident/getResidents").then((residents: any) => {
          setResidentData(residents);
        }),
      ]);
    }
    getData();
  }, []);

  const getItemsToShow = () => {
    console.log(
      "current option",
      (document.getElementById("selectShow") as HTMLInputElement).value
    );
    if (
      (document.getElementById("selectShow") as HTMLInputElement).value ===
      SHOW.AVAILABLE
    ) {
      setShowItems(() => availableItems);
    } else if (
      (document.getElementById("selectShow") as HTMLInputElement).value ===
      SHOW.BORROWED
    ) {
      setShowItems(borrowedItems);
    } else {
      setShowItems(allItems);
    }
  };

  async function returnItem(evt: SyntheticEvent, key: number) {
    const item = borrowedItems[key];
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

  return (
    <>
      <h2>Lend Desk Item</h2>
      <Row>
        <Col>
          <Card className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Lend Items</h6>
              <LendDeskItemsForm
                residents={residentData}
                categories={Object.values(Categories)}
                availableItems={availableItems}
                borrowedItems={borrowedItems}
                allItems={allItems}
              />
              ;
              {
                <ModalButton
                  form={
                    <AddDeskItemsForm
                      currentItems={allItems}
                      categories={Object.values(Categories)}
                    />
                  }
                  title="Edit Items"
                  text=""
                />
              }
              <select
                id="selectShow"
                defaultValue={SHOW.BORROWED}
                onChange={getItemsToShow}
              >
                {Object.values(SHOW).map((opt, key) => {
                  return (
                    <option value={opt as string} key={key}>
                      {opt as string}
                    </option>
                  );
                })}
              </select>
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
                  {showItems ? (
                    showItems.map((item: any, key: number) => {
                      console.log(item);
                      return (
                        <tr key={item._id}>
                          <td>{item.itemName}</td>
                          <td>{item.itemCategory}</td>
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
