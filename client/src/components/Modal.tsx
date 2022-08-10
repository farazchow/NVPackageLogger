import React, { Component, ReactElement, useState } from "react";
import ReactModal from "react-modal";
import { CheckOutForm, CheckInForm } from "./CheckInOutForm";
import { IResident } from "../../../server/models/resident";
import { Toast } from "./Toasts";

type ModalProps = {
  title: string;
  children: React.ReactElement;
};

export const Modal = (props: any) => {
  const [isOpen, setIsOpen] = useState(true);

  console.log("children values are", Object.values(props.children));
  console.log("total is", props.children);

  return (
    <>
      <div className="modalButton">
        <ReactModal isOpen={props.isOpen || isOpen} ariaHideApp={false}>
          <>
            <h2>{props.title}</h2>
            {props.children}
          </>
        </ReactModal>
      </div>
    </>
  );
};

type checkInOutProps = {
  form: ReactElement;
};

const CheckOutModal = (props: any, resident: IResident) => {
  return (
    <>
      <Modal {...props} children={<CheckOutForm {...resident} />} />{" "}
    </>
  );
};
``;
const CheckInModal = (props: any) => {
  return (
    <>
      <Modal {...props} children={<CheckInForm />} />{" "}
    </>
  );
};

export { CheckOutModal, CheckInModal };
