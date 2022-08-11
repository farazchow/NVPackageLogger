import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { Title } from "react-bootstrap/lib/Modal";
import { ResidentType } from "../../../server/models/resident";
import { post } from "../../utilities";
import "../css/residentCheckIn.css";
import { Modal } from "./Modal";
import { SuccessToast, ErrorToast as FailureToast } from "./Toasts";

type FormProps = {
  resident: ResidentType;
  formType: ModalFormType;
};

export enum ModalFormType {
  CHECKIN = "post",
  CHECKOUT = "checkout",
  EDIT = "edit",
}

const Form = (props: FormProps) => {
  const { resident, formType } = props;
  const [formState, setFormState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    residentID: "",
    kerb: "",
    room: "",
    year: "",
    homeAddress: "",
    phoneNumber: "",
    forwardingAddress: "",
    checkedIn: true,
    dateIn: new Date(0),
    dateOut: new Date(0),
  });

  const [submittedState, setSubmittedState] = useState(false);

  useEffect(() => {
    if (formType === ModalFormType.CHECKIN) return;
    console.log("props are", props);
    setFormState({
      firstName: resident.firstName,
      middleName: resident.middleName,
      lastName: resident.lastName,
      residentID: resident.residentID,
      kerb: resident.kerb,
      room: resident.room,
      year: resident.year,
      homeAddress: resident.homeAddress,
      phoneNumber: resident.phoneNumber,
      forwardingAddress: resident.forwardingAddress,
      checkedIn: resident.checkedIn,
      dateIn: resident.dateIn,
      dateOut: resident.dateOut,
    });
  }, []);

  function isFormValid() {
    console.log("IsValid Check");
    console.log(formState);
    return Object.values(formState).every((state) => {
      return state !== "";
    });
  }

  console.log("type is", formType, formType === ModalFormType.CHECKIN);
  console.log(ModalFormType.CHECKIN);
  console.log(formState);

  const FormFields = [
    {
      title: "Last Name:",
      props: {
        name: "lastName",
        attribute: "lastName",
        placeholder: resident.lastName || "Last Name",
        disabled: formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: "First Name:",
      props: {
        name: "firstName",
        attribute: "firstName",
        placeholder: resident.firstName || "First Name",
        disabled: formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: "Middle Name:",
      props: {
        name: "middleName",
        attribute: "middleName",
        placeholder: resident.middleName || "Middle Name",
        disabled: formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: "Kerb:",
      props: {
        name: "kerb",
        attribute: "kerb",
        placeholder: resident.kerb || "Kerberos (Not Email)",
        disabled: formType !== ModalFormType.CHECKIN,
      },
    },
    {
      title: "Resident ID:",
      props: {
        name: "id",
        attribute: "residentID",
        placeholder: resident.residentID || "9-digit number",
        disabled: formType !== ModalFormType.CHECKIN,
      },
    },
    {
      title: "Building-Room #:",
      props: {
        name: "room",
        attribute: "room",
        placeholder: resident.room || "W46-####",
        disabled: formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: " Class Year:",
      props: {
        name: "year",
        attribute: "year",
        placeholder: resident.year || "YYYY",
        disabled: formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: "Home Address:",
      props: {
        name: "homeAddress",
        attribute: "homeAddress",
        placeholder: resident.homeAddress || "Street, City, State, Zip Code",
        disabled: formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: "Phone Number:",
      props: {
        name: "phoneNumber",
        attribute: "phoneNumber",
        placeholder: resident.phoneNumber || "Phone Number",
        disabled: formType === ModalFormType.CHECKOUT,
      },
    },
    {
      title: "Forwarding Address:",
      props: {
        name: "forwardingAddress",
        attribute: "forwardingAddress",
        placeholder:
          resident.forwardingAddress || "Street, City, State, Zip Code",
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

            post(`/api/resident/${formType}Resident`, formState)
              .then(() => console.log("asfdsafsafklj"))
              .then(() => {
                setSubmittedState(true);
              })
              .catch((err: Error) => console.log("Error in CheckInOutForm"));
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

export const factoryResident = () => {
  return {
    firstName: "",
    middleName: "",
    lastName: "",
    residentID: "",
    kerb: "",
    room: "",
    year: "",
    homeAddress: "",
    phoneNumber: "",
    forwardingAddress: "",
    checkedIn: true,
    dateIn: new Date(0),
    dateOut: new Date(0),
  };
};

const CheckInForm = () => {
  return (
    <Form
      {...{ resident: factoryResident(), formType: ModalFormType.CHECKIN }}
    />
  );
};

const CheckOutForm = (resident: ResidentType) => {
  return <Form {...{ resident: resident, formType: ModalFormType.CHECKOUT }} />;
};

const EditForm = (resident: ResidentType) => {
  return <Form {...{ resident: resident, formType: ModalFormType.EDIT }} />;
};

export { CheckInForm, CheckOutForm, EditForm };
