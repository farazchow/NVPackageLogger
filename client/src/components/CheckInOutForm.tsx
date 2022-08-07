import React, { FunctionComponent, useEffect, useState } from "react";
import { IResident } from "../../../server/models/resident";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { post } from "../../utilities";
import "../css/residentCheckIn.css";

type FormState = {
  studentId: string;
  resident: string;
  room: string;
  year: string;
  homeAddress: string;
  forwardingAddress: string;
  checkedIn: boolean;
  date: string;
};

export enum ModalFormType {
  CHECKIN,
  CHECKOUT,
  EDIT,
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
    date: "",
  });

  useEffect(() => {
    console.log("here", formType);
    if (props.formType === ModalFormType.CHECKIN) {
      console.log("lkjaslfdkjasfdlkjlaskdjf");
      return;
    }

    setFormState({
      studentId: props?.studentId!,
      resident: props?.resident!,
      room: props?.room!,
      year: props?.year!,
      homeAddress: props?.homeAddress!,
      forwardingAddress: props?.forwardingAddress!,
      checkedIn: props?.checkedIn!,
      date: "",
    });
  }, []);

  useEffect(() => {
    console.log("formState changed", formState);
    console.log("props", props, props.formType);
  }, [formState]);

  function isFormValid() {
    console.log("IsValid Check");
    console.log(formState);
    for (const val of Object.values(formState)) {
      console.log("val = ", val);
      if (val == "") {
        return false;
      }
    }
    return true;
  }

  console.log("type is", formType, formType === ModalFormType.CHECKIN);
  console.log(ModalFormType.CHECKIN);

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

  return (
    <>
      <br></br>
      <div>
        <form
          onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault();
            if (formType === ModalFormType.CHECKIN) {
              if (isFormValid()) {
                post("/api/resident/postResident", formState).then((res) => {
                  console.log("Posted!");
                });
                document.location.reload();
              } else {
                window.alert("Not all Fields Filled");
              }
            } else if (formType === ModalFormType.EDIT) {
              if (isFormValid()) {
                post("/api/resident/editResident", formState).then((res) => {
                  console.log(formState);
                  console.log("Posted!");
                });
                // document.location.reload();
              } else {
                window.alert("Not all Fields Filled");
              }
            } else if (formType === ModalFormType.CHECKOUT) {
              post("/api/resident/checkoutResident", formState).then((res) => {
                console.log("checked out!");
              });
            }
          }}
        >
          <p className="title">Resident Information Form</p>
          {FormFields.map((field: { title: string; props: object }) => (
            <label>
              {field.title}
              <input type="text" {...field.props} />
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
