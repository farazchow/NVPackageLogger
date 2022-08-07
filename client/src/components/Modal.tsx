import React, { Component, ReactElement, useState } from "react";
import Modal from "react-modal";

type ModalProps = {
  form: React.ReactElement;
  title: string;
  text: string | React.ReactElement;
};

export const ModalButton = (props: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="modalButton">
      <button onClick={() => setIsOpen(true)}>{props.title}</button>

      <Modal isOpen={isOpen} ariaHideApp={false}>
        <h2>{props.title}</h2>
        <h1>{props.text}</h1>
        {props.form}
        <div>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};
