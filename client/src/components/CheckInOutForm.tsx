import React, {
  FunctionComponent,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { Title } from "react-bootstrap/lib/Modal";
import { ResidentType } from "../../../server/models/resident";
import { Semester, SemesterType } from "../../../server/models/semester";
import { post } from "../../utilities";
import "../css/residentCheckIn.css";
import { Modal } from "./Modal";
import { SuccessToast, ErrorToast as FailureToast } from "./Toasts";

type FormProps = {
  resident: ResidentType;
  formType: ModalFormType;
};

export enum ModalFormType {
  CHECKIN = "checkin",
  CHECKOUT = "checkout",
  ADD = "post",
  EDIT = "edit",
}

const Form = (props: FormProps) => {
  const { resident, formType } = props;
  const emptySemester: SemesterType[] = [];
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
    notes: "",
    semesters: emptySemester,
  });

  const [submittedState, setSubmittedState] = useState(false);

  useEffect(() => {
    if (formType === ModalFormType.ADD) return;
    console.log("props are", props);
    setFormState((prevState) => ({
      ...prevState,
      firstName: resident.firstName,
      middleName: resident.middleName,
      lastName: resident.lastName,
      residentID: resident.residentID,
      kerb: resident.kerb,
      year: resident.year,
      homeAddress: resident.homeAddress,
      phoneNumber: resident.phoneNumber,
      forwardingAddress: resident.forwardingAddress,
      checkedIn: resident.checkedIn,
    }));
    if (
      typeof resident.semesters != "undefined" &&
      resident.semesters !== null &&
      resident.semesters.length > 0
    ) {
      setFormState((prevState) => ({
        ...prevState,
        room: resident.semesters[resident.semesters.length - 1].room,
        dateIn: resident.semesters[resident.semesters.length - 1].dateIn,
        dateOut: resident.semesters[resident.semesters.length - 1].dateOut,
        notes: resident.semesters[resident.semesters.length - 1].notes,
        semesters: resident.semesters,
      }));
    }
  }, []);

  function isFormValid(formType: string) {
    console.log("IsValid Check");
    console.log(formState);
    if (formType === ModalFormType.ADD) {
      return formState.kerb !== "" && formState.residentID !== "";
    } else {
      return Object.values(formState).every((state) => {
        return state !== "";
      });
    }
  }

  console.log(formState);

  const room = "W46-####";
  if (
    typeof resident.semesters != "undefined" &&
    resident.semesters !== null &&
    resident.semesters.length > 0
  ) {
    console.log(resident.semesters);
    const room = resident.semesters[resident.semesters.length - 1].room;
  }

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
        disabled: formType !== ModalFormType.ADD,
      },
    },
    {
      title: "Resident ID:",
      props: {
        name: "id",
        attribute: "residentID",
        placeholder: resident.residentID || "9-digit number",
        disabled: formType !== ModalFormType.ADD,
      },
    },
    {
      title: "Building-Room #:",
      props: {
        name: "room",
        attribute: "room",
        placeholder: room || "W46-####",
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

            if (!isFormValid(formType))
              return window.alert("Not all Fields Filled");

            if (
              formType === ModalFormType.CHECKIN ||
              formType === ModalFormType.EDIT
            ) {
              const newSem = new Semester({
                room: formState.room,
                dateIn: formState.dateIn,
                dateOut: formState.dateOut,
                notes: formState.notes,
              });
              setFormState((prevState) => ({
                ...prevState,
                semesters: [...formState.semesters, newSem],
              }));
            }
            post(`/api/resident/${formType}Resident`, formState)
              .then(() => {
                setSubmittedState(true);
              })
              .catch((err: Error) => console.log("Error in form"));
          }}
        >
          <p className="title">Resident Information Form</p>
          {FormFields.map((field: { title: string; props: any }, index) => (
            <label key={index}>
              {field.title}
              <input
                type="text"
                key={index}
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
    year: "",
    homeAddress: "",
    phoneNumber: "",
    forwardingAddress: "",
    checkedIn: true,
    semesters: [
      new Semester({
        room: "",
        dateIn: new Date(0),
        dateOut: new Date(0),
        notes: "",
      }),
    ],
  };
};

const CheckInForm = (resident: ResidentType) => {
  return <Form {...{ resident: resident, formType: ModalFormType.CHECKIN }} />;
};

const CheckOutForm = (resident: ResidentType) => {
  return <Form {...{ resident: resident, formType: ModalFormType.CHECKOUT }} />;
};

const EditForm = (resident: ResidentType) => {
  return <Form {...{ resident: resident, formType: ModalFormType.EDIT }} />;
};

const AddForm = () => {
  return (
    <Form {...{ resident: factoryResident(), formType: ModalFormType.ADD }} />
  );
};

export { CheckInForm, CheckOutForm, EditForm, AddForm };
