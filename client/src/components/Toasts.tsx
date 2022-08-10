import BootstrapToast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState, useEffect } from "react";

type ToastProps = {
  strong: string;
  small: string;
  header: any;
  body: any;
  time?: number;
};

const THREESECONDS = 3000;

const Toast = (props: ToastProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, props.time || THREESECONDS);
  }, []);

  return (
    <ToastContainer
      className="sticky-top"
      style={{ border: "dotted", position: "fixed" }}
    >
      <BootstrapToast className="sticky-top" show={show}>
        <BootstrapToast.Header>
          {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
          <strong className="me-auto">{props.strong}</strong>
          <small>{props.small}</small>
          {props.header}
        </BootstrapToast.Header>
        <BootstrapToast.Body>{props.body}</BootstrapToast.Body>
      </BootstrapToast>
    </ToastContainer>
  );
};

const SuccessToast = () => {
  const successProps = {
    strong: "Success",
    small: "Good Job",
    header: "Header here?",
    body: "BOYDDYDYDYDYDY",
    time: 3000,
  };

  return <Toast {...successProps} />;
};

const ErrorToast = () => {
  const failureProps = {
    strong: "Success",
    small: "Good Job",
    header: "Header here?",
    body: "BOYDDYDYDYDYDY",
    time: 3000,
  };

  return <Toast {...failureProps} />;
};

export { Toast, SuccessToast, ErrorToast };
