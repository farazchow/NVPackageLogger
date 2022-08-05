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
    </>
  );
};

type State = {
  studentId: string;
};

class ResidentTable extends React.Component<{}, State> {
  override render() {
    const [data, setData] = useState<IResident[]>([]);

    // data fetching
    useEffect(() => {
      async function getData() {
        fetch("/api/resident/getResident")
          .then((res) => res.json())
          .then((data) => setData(data));
      }
      getData();
    }, []);

    return (
      <>
        <Row>
          <Col>
            <Card className="mb-4">
              <Card.Title>Residents</Card.Title>
              <Card.Body className="p-0 pb-3">
                <table data-size="small" className="table mb-0">
                  <thead className="bg-light">
                    <tr></tr>
                  </thead>
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
