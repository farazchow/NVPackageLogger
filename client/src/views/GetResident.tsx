import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { get, post } from "../../utilities";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { IResident } from "../../../server/models/resident";

export const GetUpdate: FunctionComponent = () => {
  return (
    <>
      <GetUpdateForm />
      <ResidentTable />
    </>
  );
};

type State = {
  studentId: string;
};

class ResidentTable extends React.Component {
  override state = {
    data: [],
  };

  override componentDidMount() {
    fetch("/api/resident/getResident")
      .then((res) => res.json())
      .then((residentList) => {
        this.setState({ data: residentList });
      });
  }

  override render() {
    return (
      <>
        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Title>Residents</Card.Title>
              <Card.Body className="p-0 pb-3">
                <table data-size="small" className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Student ID
                      </th>
                      <th scope="col" className="border-0">
                        Resident Name
                      </th>
                      <th scope="col" className="border-0">
                        Room
                      </th>
                      <th scope="col" className="border-0">
                        Year
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data ? (
                      this.state.data.map((rsdnt: any, key: number) => {
                        return (
                          <tr key={key}>
                            <td>{rsdnt.studentId}</td>
                            <td>
                              <a href={`view/${rsdnt._id}`}>{rsdnt.resident}</a>
                            </td>
                            <td>{rsdnt.room}</td>
                            <td>{rsdnt.year}</td>
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
}

class GetUpdateForm extends React.Component<{}, State> {
  override state = {
    studentId: "",
  };
  override render() {
    return (
      <>
        <br></br>
        <div>
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                studentId: { value: string };
              };
              this.state.studentId = target.studentId.value;

              post("/api/resident/putResident", this.state).then((res) => {
                console.log("Put!", res);
              });

              console.log("submitted", this.state.studentId);
            }}
          >
            <p>
              <label>
                MIT ID: <input type="text" name="studentId" />
              </label>
            </p>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </>
    );
  }
}
