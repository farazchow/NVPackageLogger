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
      {/* <GetUpdateForm /> */}
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

                          {/* <CheckOutModal
                            resident={rsdnt}
                            title={"Resident Check-Out"}
                            text={
                              <div className="information2">
                                <p>
                                  A few things to be aware of...
                                  <br />
                                  <br />
                                  - New Vassar Desk cannot directly forward
                                  packages (other than USPS), and we cannot
                                  forward mail internationally (so if you will
                                  be living internationally, please provide a
                                  C/O residing in the US if possible).
                                  <br />
                                  - In general, if you want your mail to be
                                  forwarded to someone who is not you or you
                                  would like to authorize your mail pick up to
                                  someone who is not you, include "C/O Firstname
                                  Lastname".
                                  <br />
                                  - Directly call Ganatra at (𝟐𝟓𝟔) 𝟐𝟓𝟖-𝟗𝟔𝟑𝟎 or
                                  email out to the desk supervisors' mailing
                                  list 𝐧𝐯-𝐝𝐞𝐬𝐤@𝐦𝐢𝐭.𝐞𝐝𝐮 if you have any questions
                                  concerning this form.
                                  <br />
                                  <br />
                                  [Note: In the event you are corresponding with
                                  affiliates of New Vassar Desk via phone
                                  [𝟔𝟏𝟕-𝟐𝟓𝟑-𝟗𝟓𝟎𝟓] or via email
                                  (𝐧𝐯-𝐝𝐞𝐬𝐤𝐰𝐨𝐫𝐤𝐞𝐫𝐬@𝐦𝐢𝐭.𝐞𝐝𝐮 or
                                  𝐧𝐯-𝐬𝐮𝐦𝐦𝐞𝐫𝐝𝐞𝐬𝐤@𝐦𝐢𝐭.𝐞𝐝𝐮) to arrange a one-off
                                  mail/package pickup, if you wish to
                                  confirm/denote authorization for someone else
                                  to pickup (or be forwarded) your mail on your
                                  behalf we ask that you please provide their
                                  Full Name &amp; cc' and/or provide reference
                                  details for them as needed with respect to the
                                  medium of communication]
                                  <br />
                                  <br />
                                  Thanks, Ganatra
                                </p>
                                <p>
                                  Please fill out the following form as part of
                                  the checkin process. You will only be asked to
                                  change the forwarding address and note down
                                  the current date.
                                </p>
                                <p>
                                  Please pay attention to forwarding address as
                                  we will use this for forwarding mail and
                                  packages when you are not here. The forwarding
                                  address must be of the form Street, City,
                                  State, Zip Code
                                </p>
                              </div>
                            } 
                          />*/}
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
