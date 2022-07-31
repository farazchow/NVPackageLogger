import React, { FunctionComponent, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { NotesInterface } from "../../../server/models/notes";
import { post } from "../../utilities";
import "../css/forms.css";

export function DailyNotes () {
  const [data, setData] = useState<NotesInterface[]>([]);

  useEffect(() => {
    async function getData() {
      fetch("/api/notes/getNotes")
        .then((res) => res.json())
        .then((data) => setData(data));
    }
    getData();
  }, []);

  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

    return (
      <>
        <Row>
        <Col>
          <Card className="mb-4">
            <CardHeader className="border-bottom">
              <DailyNotesForm/>
              <h6 className="m-0">MongoDB Data</h6>
            </CardHeader>
            <Card.Body className="p-0 pb-3">
              <table data-size="small" className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Note
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
                    data.map((note: any, key: number) => {
                      return (
                        <tr key={key}>
                          <td>{note.note}</td>
                          <td>{note.deskworker}</td>
                          <td>{note.createdAt}</td>
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

const DailyNotesForm = () => {
  return (
      <>
      <div>
      <form onSubmit={(e: React.SyntheticEvent) => {
                  e.preventDefault();
                  const target = e.target as typeof e.target & {
                    note: { value: string },
                    deskworker: { value: string },
                  };
                  const note = {
                    "note": target.note.value,
                    "deskworker": target.deskworker.value,
                    "createdAt": new Date()
                  }
                  post("/api/notes/addNote", note).then((res) => {
                    console.log("note added!");
                    document.location.reload();
                  });
              }} className = "form-inline">
          <p>
              <label>
              Note: <input type="text" id = "note-textbox" name="note"/>
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

export default DailyNotes;  