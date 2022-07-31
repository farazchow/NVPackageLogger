import React, { FunctionComponent, useEffect, useState } from "react";
import { post } from "../../utilities";
import "../css/residentCheckIn.css";

export const CheckInOut: FunctionComponent = () => {
  return (
    <>
      <h1 className="informationTitle">Resident Check-in/Check-out</h1>

      <section>
        <div className="information2">
          <p>
            A few things to be aware of...
            <br />
            <br />
            - New Vassar Desk cannot directly forward packages (other than
            USPS), and we cannot forward mail internationally (so if you will be
            living internationally, please provide a C/O residing in the US if
            possible).
            <br />
            - In general, if you want your mail to be forwarded to someone who
            is not you or you would like to authorize your mail pick up to
            someone who is not you, include "C/O Firstname Lastname".
            <br />
            - Directly call Ganatra at (𝟐𝟓𝟔) 𝟐𝟓𝟖-𝟗𝟔𝟑𝟎 or email out to the desk
            supervisors' mailing list 𝐧𝐯-𝐝𝐞𝐬𝐤@𝐦𝐢𝐭.𝐞𝐝𝐮 if you have any questions
            concerning this form.
            <br />
            <br />
            [Note: In the event you are corresponding with affiliates of New
            Vassar Desk via phone [𝟔𝟏𝟕-𝟐𝟓𝟑-𝟗𝟓𝟎𝟓] or via email
            (𝐧𝐯-𝐝𝐞𝐬𝐤𝐰𝐨𝐫𝐤𝐞𝐫𝐬@𝐦𝐢𝐭.𝐞𝐝𝐮 or 𝐧𝐯-𝐬𝐮𝐦𝐦𝐞𝐫𝐝𝐞𝐬𝐤@𝐦𝐢𝐭.𝐞𝐝𝐮) to arrange a
            one-off mail/package pickup, if you wish to confirm/denote
            authorization for someone else to pickup (or be forwarded) your mail
            on your behalf we ask that you please provide their Full Name &amp;
            cc' and/or provide reference details for them as needed with respect
            to the medium of communication]
            <br />
            <br />
            Thanks, Ganatra
          </p>
          <p>
            Please fill out the following form as part of the checkout process
          </p>
          <p>
            Please pay attention to forwarding address as we will use this for
            forwarding mail and packages when you are not here. The forwarding
            address must be of the form Street, City, State, Zip Code
          </p>
        </div>
      </section>

      <CheckInOutInputForm />
      <br></br>
    </>
  );
};

type State = {
  id: string;
  resident: string;
  room: string;
  year: string;
  homeAddress: string;
  forwardingAddress: string;
  date: string;
};

class CheckInOutInputForm extends React.Component<{}, State> {
  override state = {
    id: "",
    resident: "",
    room: "",
    year: "",
    homeAddress: "",
    forwardingAddress: "",
    date: "",
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
                id: { value: string };
                resident: { value: string };
                room: { value: string };
                type: { value: string };
                year: { value: string };
                homeAddress: { value: string };
                forwardingAddress: { value: string };
                date: { value: string };
              };
              this.state.id = target.id.value;
              this.state.resident = target.resident.value;
              this.state.room = target.room.value;
              this.state.year = target.year.value;
              this.state.homeAddress = target.homeAddress.value;
              this.state.forwardingAddress = target.forwardingAddress.value;
              this.state.date = target.date.value;

              post("/api/resident/postResident", this.state).then((res) => {
                console.log("Posted!");
              });

              console.log(
                "submitted %s %s %s",
                this.state.id,
                this.state.resident,
                this.state.room,
                this.state.year,
                this.state.homeAddress,
                this.state.forwardingAddress,
                this.state.date
              );
            }}
          >
            <p className="title">Check-in/Check-out Form</p>
            <p>
              <label>
                MIT ID:{" "}
                <input type="text" name="id" placeholder="9-digit number" />
              </label>
            </p>

            <p>
              <label>
                Resident Name:{" "}
                <input
                  type="text"
                  name="resident"
                  placeholder="First Name Last Name"
                />
              </label>
            </p>

            <p>
              <label>
                Building-Room #:{" "}
                <input type="text" name="room" placeholder="W46-####" />
              </label>
            </p>

            <p>
              <label>
                Class Year: <input type="text" name="year" placeholder="YYYY" />
              </label>
            </p>

            <p>
              <label>
                Home Address:{" "}
                <input
                  type="text"
                  name="homeAddress"
                  placeholder="Street, City, State, Zip Code"
                />
              </label>
            </p>

            <p>
              <label>
                Forwarding Address:{" "}
                <input
                  type="text"
                  name="forwardingAddress"
                  placeholder="Street, City, State, Zip Code"
                />
              </label>
            </p>

            <p>
              <label>
                Date: <input type="text" name="date" placeholder="MM/DD/YYYY" />
              </label>
            </p>

            <button
              className="button-17"
              onClick={() => {
                post("/Shibboleth.sso/Login/");
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}
