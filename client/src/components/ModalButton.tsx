import { useState } from "react";
import Modal from "react-modal";
import "../css/addbutton.css";

export const ModalButton = (props: { form: JSX.Element; title: string }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="modalButton">
      <button onClick={() => setModalIsOpen(true)}>{props.title}</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <h2>{props.title}</h2>
        {props.form}
        <div>
          <button onClick={() => setModalIsOpen(false)}>Close</button>
        </div>
      </Modal>
    </div>
  );
};
