import React, { useState } from "react";
import Modal from "react-modal";
import "../css/addbutton.css";

export const ModalButton = (form: React.ReactElement, title: string) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="modalButton">
      <button onClick={() => setModalIsOpen(true)}>{title}</button>
      {/* <Modal isOpen={modalIsOpen} onRequestClose = {()=> setModalIsOpen(false)}> */}
      <Modal isOpen={modalIsOpen} ariaHideApp={false}>
        <h2>{title}</h2>
        {form}
        <div>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};
