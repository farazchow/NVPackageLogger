import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { get, post, deconstruct } from "../../utilities";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { AddForm } from "../components/CheckInOutForm";
import { resident } from "../../../server/models/resident";
import { CheckInModal, CheckOutModal } from "../components/Modal";
import { ModalFormType } from "../components/CheckInOutForm";

export const CheckOutResident: FunctionComponent = () => {
  return (
    // <>
    <ResidentTable />
    // </>
  );
};

type State = {
  studentId: string;
  viewModal: boolean;
};

interface ResidentTableState {
  allResidents: resident[];
  filteredResidents: resident[];
}

enum SelectOptions {
  NAME = "Full Name",
  KERB = "kerb",
  RESIDENTID = "residentID",
  ROOM = "room",
  YEAR = "year",
  DATEIN = "dateIn",
  DATEOUT = "dateOut",
}

const ResidentTable = (props: any) => {
  const [allResidents, setAllResidents] = useState([]);

  const [filteredResidents, setFilteredResidents] = useState([]);

  useEffect(() => {
    Promise.all([
      get("/api/resident/getResidents", { checkedIn: true }).then(
        (residents: any) => {
          console.log("gotten all res", residents);
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
    return setFilteredResidents(
      allResidents.filter((resident: resident & any) =>
        filterby !== SelectOptions.NAME
          ? resident[filterby]
              .toLowerCase()
              .startsWith(value.toLowerCase().trim())
          : resident.firstName
              .toLowerCase()
              .startsWith(value.toLowerCase().trim()) ||
            resident.lastName
              .toLowerCase()
              .startsWith(value.toLowerCase().trim())
      )
    );
  }
  return (
    <>
      <h3> Search Resident by Property </h3>
      <select id="selectOption">
        {Object.values(SelectOptions).map((opt: string, key: number) => {
          return (
            <option value={opt} key={key}>
              {opt}
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
            <Card.Title>Current Checked-In Residents</Card.Title>
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
                      Kerb
                    </th>
                    <th scope="col" className="border-0">
                      Phone Number
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
                    filteredResidents.map((rsdnt: resident, key: number) => {
                      return (
                        <tr key={key}>
                          <td>{rsdnt.residentID}</td>
                          <td>
                            <a href={`view/${rsdnt._id}`}>
                              {[rsdnt.firstName, rsdnt.lastName].join(" ")}
                            </a>
                          </td>
                          <td>{rsdnt.kerb}</td>
                          <td>{rsdnt.phoneNumber}</td>
                          <td>
                            {rsdnt.semesters.length
                              ? rsdnt.semesters[rsdnt.semesters.length - 1].room
                              : "Not Assigned"}
                          </td>
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
