import { Component, useEffect, useState, FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { get, deconstruct } from "../../utilities";
import { IResident } from "../../../server/models/resident";
import { CheckOutForm, EditForm } from "../components/CheckInOutForm";
import {
  Modal,
  CheckOutModal,
  EditModal,
  CheckInModal,
} from "../components/Modal";
import "../css/residentCheckIn.css";
import { ModalFormType } from "../components/CheckInOutForm";

export const SingleResidentView: FunctionComponent = () => {
  const { id } = useParams();
  console.log("id is", id);
  if (id) {
    return (
      <>
        <ResidentView id={id} />
      </>
    );
  } else {
    return (
      <div>
        <h1>Error</h1>
      </div>
    );
  }
};

type State = IResident;

type ResidentViewProps = {
  id: string;
};

const ResidentView = (props: ResidentViewProps) => {
  const [residentViewState, setResidentViewState] = useState({
    studentId: "",
    resident: "",
    room: "",
    year: "",
    homeAddress: "",
    forwardingAddress: "",
    dateIn: "",
    dateOut: "",
    checkedIn: true,
  });

  useEffect(() => {
    get("/api/resident/getResidentById", { id: props.id }).then((res: any) =>
      setResidentViewState(res)
    );
  }, []);

  return (
    <>
      <div>{deconstruct(residentViewState)}</div>
      <EditModal resident={{ ...residentViewState }} />

      <CheckOutModal resident={{ ...residentViewState }} />
    </>
  );
};
