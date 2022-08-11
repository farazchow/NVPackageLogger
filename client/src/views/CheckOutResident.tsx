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
import { CheckOutForm } from "../components/CheckInOutForm";
import { IResident } from "../../../server/models/resident";
import { CheckInModal, CheckOutModal } from "../components/Modal";
import { ModalFormType } from "../components/CheckInOutForm";

export const CheckOutResident: FunctionComponent = () => {
  return (
    <>
      <ResidentTable />
    </>
  );
};

type State = {
  studentId: string;
};

interface ResidentTableState {
  allResidents: IResident[];
  filteredResidents: IResident[];
}

enum SelectOptions {
  STUDENT = "resident",
  STUDENTID = "studentId",
  ROOM = "room",
  YEAR = "year",
  DATEIN = "dateIn",
  DATEOUT = "dateOut",
}

const ResidentTable = (props: {}) => {
  const [allResidents, setAllResidents] = useState([]);

  const [filteredResidents, setFilteredResidents] = useState([]);

  useEffect(() => {
    Promise.all([
      get("/api/resident/getResidents", { checkedIn: true }).then(
        (residents: any) => {
          setAllResidents(residents);
        }
      ),
      get("/api/resident/getResidents", { checkedIn: true }).then(
        (residents: any) => {
          setFilteredResidents(residents);
        }
      ),
    ]);
  }, []);

  function filterData(value: string, filterby: string) {
    console.log("in filter data", filteredResidents);

    return setFilteredResidents(
      allResidents.filter((data: any) =>
        data[filterby].toLowerCase().startsWith(value.toLowerCase())
      )
    );
  }
  return (
    <>
      <h3> Search Resident Name </h3>
      <select id="selectOption">
        {Object.values(SelectOptions).map((opt, key) => {
          return (
            <option value={opt as string} key={key}>
              {opt as string}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        onChange={(event: SyntheticEvent) =>
          filterData(
            (event.target as HTMLInputElement).value,
            (document.getElementById("selectOption") as HTMLInputElement).value
          )
        }
      />

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
                  {filteredResidents ? (
                    filteredResidents.map((rsdnt: any, key: number) => {
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
};
