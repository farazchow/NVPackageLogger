import React, { FunctionComponent } from "react";
import { AddForm } from "../components/CheckInOutForm";
import { ModalFormType } from "../components/CheckInOutForm";
import "../css/residentCheckIn.css";
import "../css/universal.css";

export const AddResident: FunctionComponent = () => {
  // change message to check in message
  return (
    <>
      <h1 className="mainTitle">Add Resident</h1>

      <AddForm />

      <br></br>
    </>
  );
};
