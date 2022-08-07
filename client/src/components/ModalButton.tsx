import React, { Component, ReactElement, useState } from "react";
import Modal from "react-modal";
import "../css/addbutton.css";

interface ModalProps {
  form: React.ReactElement;
  title: string;
}

interface ModalState {
  modalIsOpen: boolean;
}

export class ModalButton extends Component<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  override render() {
    return (
      <div className="modalButton">
        <button onClick={() => this.setState({ modalIsOpen: true })}>
          {this.props.title}
        </button>
        <Modal
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.75)",
            },
            content: {
              position: "absolute",
              top: "200px",
              left: "40px",
              right: "40px",
              bottom: "40px",
              border: "1px solid #ccc",
              background: "white",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
          isOpen={this.state.modalIsOpen}
          ariaHideApp={false}
        >
          <h2>{this.props.title}</h2>
          {this.props.form}
          <div>
            <button onClick={() => this.setState({ modalIsOpen: false })}>
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}
