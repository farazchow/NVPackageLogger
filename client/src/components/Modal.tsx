import React, { Component, ReactElement, useState } from "react";
import Modal from "react-modal";

interface ModalProps {
  form: React.ReactElement;
  title: string;
  text: string | React.ReactElement;
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

        <Modal isOpen={this.state.modalIsOpen} ariaHideApp={false}>
          <h2>{this.props.title}</h2>
          <h1>{this.props.text}</h1>
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
