import React, { Component, ReactElement, useState } from "react";
import ReactModal from "react-modal";
import { EditForm, CheckOutForm, CheckInForm, AddForm } from "./CheckInOutForm";
import { ResidentType } from "../../../server/models/resident";
import { Toast } from "./Toasts";
import { ModalButton } from "./ModalButton";

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

const CheckOutModal = (props: any, resident: ResidentType) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log("props are", props, "resident is", resident);

  return (
    <ModalButton
      form={<CheckOutForm {...props.resident} />}
      title="Check Out Resident"
    />
  );
};

const CheckInModal = (props: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <ModalButton
      form={<CheckInForm {...props.resident} />}
      title="Check In Resident"
    />
  );
};

const AddModal = (props: any, open: boolean) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return <ModalButton form={<AddForm />} title="Add Resident" />;
};

const EditModal = (props: { resident: ResidentType }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <ModalButton
      form={<EditForm {...props.resident} />}
      title="Edit Resident Info"
    />
  );
};

export { CheckOutModal, CheckInModal, EditModal, AddModal };
