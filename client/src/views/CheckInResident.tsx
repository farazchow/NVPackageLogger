import React, { FunctionComponent } from "react";
import CheckInOutForm from "../components/CheckInOutForm";
import { ModalFormOptions } from "../components/CheckInOutForm";
import "../css/residentCheckIn.css";

export const CheckInResident: FunctionComponent = () => {
  // change message to check in message
  return (
    <>
      <h1 className="informationTitle">Resident Check-in</h1>

      <section>
        <div className="information2">
          <p>Welcome to New Vassar! </p>
          <br />
          Change this message to check-in message????
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
            Please fill out the following form as part of the checkin process
          </p>
          <p>
            Please pay attention to forwarding address as we will use this for
            forwarding mail and packages when you are not here. The forwarding
            address must be of the form Street, City, State, Zip Code
          </p>
        </div>
      </section>

      <CheckInOutForm updateStatus={ModalFormOptions.CHECKIN} resident={null} />
      <br></br>
    </>
  );
};
