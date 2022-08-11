import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { Title } from "react-bootstrap/lib/Modal";
import { IResident } from "../../../server/models/resident";
import { post } from "../../utilities";
import "../css/residentCheckIn.css";
import { Modal } from "./Modal";
import { SuccessToast, ErrorToast as FailureToast } from "./Toasts";

type FormState = {
  studentId: string;
  resident: string;
  room: string;
  year: string;
  homeAddress: string;
  forwardingAddress: string;
  checkedIn: boolean;
  date: Date;
};

export enum ModalFormType {
  CHECKIN = "post",
  CHECKOUT = "checkout",
  EDIT = "edit",
}

type FormProps = IResident | null;

const Form = (props: any, formType: number) => {
  const [formState, setFormState] = useState({
    studentId: "",
    resident: "",
    room: "",
    year: "",
    homeAddress: "",
    forwardingAddress: "",
    checkedIn: true,
    date: new Date(0),
  });

  const [submittedState, setSubmittedState] = useState(false);

  useEffect(() => {
    if (props.formType === ModalFormType.CHECKIN) return;
    console.log("props are", props);
    setFormState({
      studentId: props?.studentId!,
      resident: props?.resident!,
      room: props?.room!,
      year: props?.year!,
      homeAddress: props?.homeAddress!,
      forwardingAddress: props?.forwardingAddress!,
      checkedIn: props?.checkedIn!,
      date: formState.date,
    });
  }, []);

  function isFormValid() {
    console.log("IsValid Check");
    console.log(formState);
    return Object.values(formState).every((state) => {
      return state !== "";
    });
  }

  console.log("type is", formType, props.formType === ModalFormType.CHECKIN);
  console.log(ModalFormType.CHECKIN);
  console.log(formState);

  const FormFields = [
    {
      title: "MIT ID:",
      props: {
        name: "id",
        attribute: "studentId",
        placeholder: props?.studentId || "9-digit number",
        disabled: props.formType !== ModalFormType.CHECKIN,
      },
    },
    {
      title: "Resident Name:",
      props: {
        name: "resident",
        attribute: "resident",
        placeholder: props?.resident || "First Name Last Name",
        disabled: props.formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: "Building-Room #:",
      props: {
        name: "room",
        attribute: "room",
        placeholder: props?.room || "W46-####",
        disabled: props.formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: " Class Year:",
      props: {
        name: "year",
        attribute: "year",
        placeholder: props?.year || "YYYY",
        disabled: props.formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: "Home Address:",
      props: {
        name: "homeAddress",
        attribute: "homeAddress",
        placeholder: props?.homeAddress || "Street, City, State, Zip Code",
        disabled: props.formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: "Forwarding Address:",
      props: {
        name: "forwardingAddress",
        attribute: "forwardingAddress",
        placeholder:
          props?.forwardingAddress || "Street, City, State, Zip Code",
        disabled: false,
      },
    },
  ];

  const updateFormState = (event: SyntheticEvent, key: any): void => {
    setFormState((prevState) => ({
      ...prevState,
      [key]: (event.target as HTMLInputElement).value,
    }));
  };

  return (
    <>
      <br></br>
      {submittedState && <SuccessToast />}

      <div style={{ border: "dotted" }}>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();

            if (!isFormValid()) return window.alert("Not all Fields Filled");

            post(`/api/resident/${props.formType}Resident`, formState)
              .then(() => console.log("asfdsafsafklj"))
              .then(() => {
                setSubmittedState(true);
                // <Modal
                //   title={"Sucess!"}
                //   body={
                //     <div>
                //       <h3>"Server has been properly updated"</h3>
                //     </div>
                //   }
                // />;
              })
              .catch(
                (err: Error) => console.log("Error in CheckInOutForm")
                // <Modal
                //   title={"We encountered an error"}
                //   body={
                //     <div>
                //       <h3>
                //         "Failed to update to server. Please try again later"
                //       </h3>
                //     </div>
                //   }
                // />
              );
          }}
        >
          <p className="title">Resident Information Form</p>
          {FormFields.map((field: { title: string; props: any }) => (
            <label>
              {field.title}
              <input
                type="text"
                {...field.props}
                onChange={(e: SyntheticEvent) =>
                  updateFormState(e, field.props.attribute!)
                }
              />
            </label>
          ))}

          <button className="button-17">Submit</button>
        </form>
        <div className="bottomPadding"></div>
      </div>
    </>
  );
};

const CheckInForm = () => {
  return <Form {...{ props: null }} {...{ formType: ModalFormType.CHECKIN }} />;
};

const CheckOutForm = (props: FormProps) => {
  return <Form {...props} {...{ formType: ModalFormType.CHECKOUT }} />;
};

const EditForm = (props: FormProps) => {
  return <Form {...props} {...{ formType: ModalFormType.EDIT }} />;
};

export { CheckInForm, CheckOutForm, EditForm };
