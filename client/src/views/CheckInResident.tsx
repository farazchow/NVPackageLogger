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
import { ResidentType } from "../../../server/models/resident";
import { CheckInModal, AddModal } from "../components/Modal";
import { ModalFormType } from "../components/CheckInOutForm";

export const CheckInResident: FunctionComponent = () => {
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
  allResidents: ResidentType[];
  filteredResidents: ResidentType[];
}

enum SelectOptions {
  NAME = "Full Name",
  KERB = "kerb",
  RESIDENTID = "residentID",
}

const ResidentTable = (props: any) => {
  const [allResidents, setAllResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);

  useEffect(() => {
    Promise.all([
      get("/api/resident/getNotCheckedInResidents", { checkedIn: true }).then(
        (residents: any) => {
          setAllResidents(residents);
        }
      ),
      get("/api/resident/getNotCheckedInResidents", { checkedIn: true }).then(
        (residents: any) => {
          setFilteredResidents(residents);
        }
      ),
    ]);
  }, []);

  function filterData(value: string, filterby: string) {
    return setFilteredResidents(
      allResidents.filter((resident: ResidentType & any) =>
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
      <td>
        <AddModal />
      </td>
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
            <Card.Title>Residents</Card.Title>
            <Card.Body className="p-0 pb-3">
              <table data-size="small" className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      Student ID
                    </th>
                    <th scope="col" className="border-0">
                      Kerb
                    </th>
                    <th scope="col" className="border-0">
                      Resident Name
                    </th>
                    <th>Check-In Resident</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResidents ? (
                    filteredResidents.map(
                      (rsdnt: ResidentType & { _id: string }, key: number) => {
                        return (
                          <tr key={key}>
                            <td>{rsdnt.residentID}</td>
                            <td>{rsdnt.kerb}</td>
                            <td>
                              <a href={`view/${rsdnt._id}`}>
                                {[rsdnt.firstName, rsdnt.lastName].join(" ")}
                              </a>
                            </td>
                            <td>
                              <CheckInModal resident={rsdnt} />
                            </td>
                          </tr>
                        );
                      }
                    )
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
