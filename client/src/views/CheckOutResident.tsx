import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
  Component,
} from "react";
import { get, post } from "../../utilities";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { IResident } from "../../../server/models/resident";

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

class ResidentTable extends React.Component<{}, ResidentTableState> {
  override state = {
    allResidents: [],
    filteredResidents: [],
  };

  override componentDidMount() {
    get("/api/resident/getResidents", { checkedIn: true }).then(
      (residents: any) => {
        this.setState({
          allResidents: residents,
          filteredResidents: residents,
        });
      }
    );
  }

  filterData(value: string) {
    return this.setState({
      filteredResidents: this.state.allResidents.filter((data: IResident) =>
        data.resident.startsWith(value)
      ),
    });
  }

  override render() {
    return (
      <>
        <h3> Search Resident Name </h3>
        <input
          type="text"
          onChange={(event: SyntheticEvent) =>
            this.filterData((event.target as HTMLInputElement).value)
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
                    {this.state.filteredResidents ? (
                      this.state.filteredResidents.map(
                        (rsdnt: any, key: number) => {
                          return (
                            <tr key={key}>
                              <td>{rsdnt.studentId}</td>
                              <td>
                                <a href={`view/${rsdnt._id}`}>
                                  {rsdnt.resident}
                                </a>
                              </td>
                              <td>{rsdnt.room}</td>
                              <td>{rsdnt.year}</td>
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
  }
}

// class GetUpdateForm extends React.Component<{}, State> {
//   // override state = {
//   //   studentId: "",
//   // };

//   constructor(props: { form: Component }) {
//     super(props);
//   }

//   override render() {
//     return (
//       <>
//         <br></br>
//         <div>
//           <form>
//             <p>
//               <label>
//                 MIT ID:{" "}
//                 <input
//                   type="text"
//                   name="studentId"
//                   onChange={(event: Event) => {
//                     this.props.form.setState();
//                   }}
//                 />
//               </label>
//             </p>
//             <input type="submit" value="Submit" />
//           </form>
//         </div>
//       </>
//     );
//   }
// }
