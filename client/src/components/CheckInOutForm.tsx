import React, { FunctionComponent, useEffect, useState } from "react";
import { IResident } from "../../../server/models/resident";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { post } from "../../utilities";
import "../css/residentCheckIn.css";

type State = {
  studentId: string;
  resident: string;
  room: string;
  year: string;
  homeAddress: string;
  forwardingAddress: string;
  checkedIn: boolean;
  date: string;
};

export enum ModalFormOptions {
  CHECKIN,
  CHECKOUT,
  EDIT,
}

type Props = {
  updateStatus: ModalFormOptions;
  resident: IResident | null;
};

class CheckInOutForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      studentId: "",
      resident: "",
      room: "",
      year: "",
      homeAddress: "",
      forwardingAddress: "",
      checkedIn: true,
      date: "",
    };
  }

  override componentDidMount() {
    if (this.props.updateStatus === ModalFormOptions.CHECKIN) {
      return;
    }

    this.setState({
      studentId: this.props.resident?.studentId!,
      resident: this.props.resident?.resident!,
      room: this.props.resident?.room!,
      year: this.props.resident?.year!,
      homeAddress: this.props.resident?.homeAddress!,
      forwardingAddress: this.props.resident?.forwardingAddress!,
      checkedIn: this.props.resident?.checkedIn!,
      date: "",
    });
  }

  isFormValid = () => {
    console.log("IsValid Check");
    console.log(this.state);
    for (const val of Object.values(this.state)) {
      console.log("val = ", val);
      if (val == "") {
        return false;
      }
    }
    return true;
  };

  override render() {
    return (
      <>
        <br></br>
        <div>
          <form
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              if (this.props.updateStatus === ModalFormOptions.CHECKIN) {
                if (this.isFormValid()) {
                  post("/api/resident/postResident", this.state).then((res) => {
                    console.log("Posted!");
                  });
                  document.location.reload();
                } else {
                  window.alert("Not all Fields Filled");
                }
              } else if (this.props.updateStatus === ModalFormOptions.EDIT) {
                if (this.isFormValid()) {
                  post("/api/resident/editResident", this.state).then((res) => {
                    console.log(this.state);
                    console.log("Posted!");
                  });
                  // document.location.reload();
                } else {
                  window.alert("Not all Fields Filled");
                }
              } else if (
                this.props.updateStatus === ModalFormOptions.CHECKOUT
              ) {
                post("/api/resident/checkoutResident", this.state).then(
                  (res) => {
                    console.log("checked out!");
                  }
                );
              }
            }}
          >
            <p className="title">Resident Information Form</p>
            <p>
              <label>
                MIT ID:
                <input
                  type="text"
                  name="id"
                  placeholder={
                    this.props.updateStatus !== ModalFormOptions.CHECKIN &&
                    this.props.resident !== null
                      ? this.props.resident.studentId
                      : "9-digit number"
                  }
                  disabled={
                    this.props.updateStatus !== ModalFormOptions.CHECKIN
                      ? true
                      : false
                  }
                  onChange={(event: any) =>
                    this.setState({
                      studentId: (event.target as HTMLTextAreaElement).value,
                    })
                  }
                />
              </label>
            </p>

            <p>
              <label>
                Resident Name:{" "}
                <input
                  type="text"
                  name="resident"
                  placeholder={
                    this.props.updateStatus !== ModalFormOptions.CHECKIN &&
                    this.props.resident !== null
                      ? this.props.resident.resident
                      : "First Name Last Name"
                  }
                  disabled={
                    this.props.updateStatus === ModalFormOptions.CHECKOUT
                      ? true
                      : false
                  }
                  onChange={(event: any) =>
                    this.setState({
                      resident: (event.target as HTMLTextAreaElement).value,
                    })
                  }
                />
              </label>
            </p>

            <p>
              <label>
                Building-Room #:{" "}
                <input
                  type="text"
                  name="room"
                  placeholder={
                    this.props.updateStatus !== ModalFormOptions.CHECKIN &&
                    this.props.resident !== null
                      ? this.props.resident.room
                      : "W46-####"
                  }
                  disabled={
                    this.props.updateStatus === ModalFormOptions.CHECKOUT
                      ? true
                      : false
                  }
                  onChange={(event: any) =>
                    this.setState({
                      room: (event.target as HTMLTextAreaElement).value,
                    })
                  }
                />
              </label>
            </p>

            <p>
              <label>
                Class Year:{" "}
                <input
                  type="text"
                  name="year"
                  placeholder={
                    this.props.updateStatus !== ModalFormOptions.CHECKIN &&
                    this.props.resident !== null
                      ? this.props.resident.year
                      : "YYYY"
                  }
                  disabled={
                    this.props.updateStatus === ModalFormOptions.CHECKOUT
                      ? true
                      : false
                  }
                  onChange={(event: any) =>
                    this.setState({
                      year: (event.target as HTMLTextAreaElement).value,
                    })
                  }
                />
              </label>
            </p>

            <p>
              <label>
                Home Address:{" "}
                <input
                  type="text"
                  name="homeAddress"
                  placeholder={
                    this.props.updateStatus !== ModalFormOptions.CHECKIN &&
                    this.props.resident !== null
                      ? this.props.resident.homeAddress
                      : "Street, City, State, Zip Code"
                  }
                  disabled={
                    this.props.updateStatus === ModalFormOptions.CHECKOUT
                      ? true
                      : false
                  }
                  onChange={(event: any) =>
                    this.setState({
                      homeAddress: (event.target as HTMLTextAreaElement).value,
                    })
                  }
                />
              </label>
            </p>

            <p>
              <label>
                Forwarding Address:{" "}
                <input
                  type="text"
                  name="forwardingAddress"
                  placeholder={
                    this.props.updateStatus !== ModalFormOptions.CHECKIN &&
                    this.props.resident !== null
                      ? this.props.resident.forwardingAddress
                      : "Street, City, State, Zip Code"
                  }
                  onChange={(event: any) =>
                    this.setState({
                      forwardingAddress: (event.target as HTMLTextAreaElement)
                        .value,
                    })
                  }
                />
              </label>
            </p>

            <button
              className="button-17"
              // onClick={() => {
              //   post("/Shibboleth.sso/Login/");
              // }}
            >
              Submit
            </button>
          </form>
          <div className="bottomPadding"></div>
        </div>
      </>
    );
  }
}

export default CheckInOutForm;
