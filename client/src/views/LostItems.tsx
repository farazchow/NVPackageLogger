import React, { SyntheticEvent, FunctionComponent, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { LostItemInterface } from "../../../server/models/lostItem";
import { post } from "../../utilities";

export function LostItems() {
  const [data, setData] = useState<LostItemInterface[]>([]);

  useEffect(() => {
    async function getData() {
      fetch("/api/lostItems/getLostItems")
        .then((res) => res.json())
        .then((data) => setData(data));
    }
    getData();
  }, []);

  async function archiveLostItem(evt: SyntheticEvent, key: number) {
    const lostItem = data[key];
    const date = new Date();

    const body = {
      description: lostItem.description,
      deskworker: lostItem.deskworker,
      createdAt: lostItem.createdAt,
      loggedAt: date,
    };
    post("/api/lostItems/archiveLostItem", body).then((res) => {
      console.log("Item archived!");
    });
    post("/api/lostItems/deleteLostItem", body).then((res) => {
      console.log("Item deleted from working db");
      document.location.reload();
    });
  }

  return (
    <>
      <Row>
        <Col>
          <Card className="mb-4">
            <CardHeader className="border-bottom">
              <LostItemsForm />
              <h6 className="m-0">MongoDB Data</h6>
            </CardHeader>
            <Card.Body className="p-0 pb-3">
              <table data-size="small" className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Description
                    </th>
                    <th scope="col" className="border-0">
                      Deskworker
                    </th>
                    <th scope="col" className="border-0">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data ? (
                    data.map((lostItem: any, key: number) => {
                      return (
                        <tr key={key}>
                          <td>{lostItem.description}</td>
                          <td>{lostItem.deskworker}</td>
                          <td>{lostItem.createdAt}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-dark btn-sm d-flex justify-content-center"
                              onClick={(evt) => {
                                archiveLostItem(evt, key);
                              }}
                            >
                              Archive
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
  )
}

const LostItemsForm = () => {
  return (
      <>
      <div>
      <form onSubmit={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  const target = e.target as typeof e.target & {
                    description: { value: string },
                    deskworker: { value: string },
                  };
                  const lostItem = {
                    "description": target.description.value,
                    "deskworker": target.deskworker.value,
                    "createdAt": new Date()
                  }
                  post("/api/lostItems/addLostItem", lostItem).then((res) => {
                    console.log("lost item added!");
                    document.location.reload();
                  });
              }} className = "form-inline">
          <p>
              <label>
              Description: <input type="text" id = "note-textbox" name="description"/>
              </label>
          </p>
          <p>
              <label>
              Deskworker: <input type="text" name="deskworker" />
              </label>
          </p>
          <input type="submit" value="Submit"/>
          </form>
      </div>
      </>    
  )}

export default LostItems;