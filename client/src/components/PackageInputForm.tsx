import {
  createElement,
  Component,
  SyntheticEvent,
  ElementType,
  JSXElementConstructor,
  useState,
} from "react";
import { IResident } from "../../../server/models/resident";

import { post } from "../../utilities";

interface Notes {
  value: string;
}

type packageState = {
  shipping_id: string;
  recipient: string;
  shipper: string;
  location: string;
  // notes: Notes;
  notes: string;
  workerIn: string;
  createdAt: Date;
};

type PackageInputProps = {
  user: string;
  residents: IResident[];
};

enum PackageShippers {
  EMPTY = "",
  AMAZON = "Amazon",
  DHL = "DHL",
  FEDEX = "FedEx",
  LASERSHIP = "LaserShip",
  UPS = "UPS",
  USPS = "USPS",
  OTHER = "Other",
}

enum Closets {
  EMPTY = "",
  A_C = "A-C",
  D_G = "D-G",
  H_J = "H-J",
  K_L = "K-L",
  M_O = "M-O",
  P_R = "P-R",
  S_V = "S-V",
  CLOSET_1 = "Closet 1",
  CLOSET_2 = "Closet 2",
  CLOSET_3 = "Closet 3",
  CLOSET_4 = "Closet 4",
  FLOOR = "Floor",
}

export const PackageInputForm = (props: PackageInputProps) => {
  const [packageInputState, setPackageInputState] = useState({
    shipping_id: "",
    recipient: "",
    shipper: "",
    location: "",
    // notes: { value: "" },
    notes: " ",
    workerIn: props.user,
    createdAt: new Date(),
  });
  function makeElement(T: string, props: any, key: string) {
    // console.log("T is", T);
    const propsWithListener = {
      onChange: (event: Event) => {
        setPackageInputState((prevState) => ({
          ...prevState,
          [key]: (event.target as HTMLTextAreaElement).value,
        }));
      },
      ...props,
    };

    return createElement(T, propsWithListener);
  }

  function isValidated() {
    return Object.values(packageInputState).every((state) => {
      return state !== "";
    });
  }

  const PackageInputFormInput = [
    {
      title: "Tracking:",
      type: "input",
      attribute: "shipping_id",
      children: { type: "text", value: packageInputState.shipping_id },
    },
    {
      title: "Shipper:",
      type: "select",
      attribute: "shipper",
      children: {
        value: packageInputState.shipper,
        children: Object.values(PackageShippers).map((option) => (
          <option>{option}</option>
        )),
      },
    },
    {
      title: "Resident:",
      type: "select",
      attribute: "recipient",
      children: {
        value: packageInputState.recipient,
        children: (
          <>
            <option></option>
            {props.residents.map((resident) => (
              <option value={resident.studentId as string}>
                {(resident.resident as string) + " (" + resident.room + ")"}
              </option>
            ))}
          </>
        ),
      },
    },

    {
      title: "Location:",
      type: "select",
      attribute: "location",
      children: {
        value: packageInputState.location,
        children: Object.values(Closets).map((option) => (
          <option>{option}</option>
        )),
      },
    },
    {
      title: "Notes:",
      type: "input",
      attribute: "notes",
      children: {
        value: packageInputState.notes,
        type: "text",
        onChange: (event: Event) => {
          setPackageInputState((prevState) => ({
            ...prevState,
            // notes: { value: (event.target as HTMLTextAreaElement).value },
            notes: (event.target as HTMLTextAreaElement).value,
          }));
        },
      },
    },
  ];

  return (
    <form
      name="packageInputForm"
      onSubmit={async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!isValidated()) {
          console.log("Please fill out all fields");
          alert("GRRR!");
        }

        post("/api/package/postPackage", packageInputState).then((res) => {
          // console.log("posted", res);
          setPackageInputState({
            shipping_id: "",
            recipient: "",
            shipper: "",
            location: "",
            // notes: { value: "" },
            notes: " ", // NOTE: space added so validate doesn't complain
            workerIn: props.user,
            createdAt: new Date(),
          });
        });
      }}
    >
      {PackageInputFormInput.map((input) => {
        return (
          <>
            {input.title}
            {makeElement(input.type, input.children, input.attribute)}
          </>
        );
      })}
      {/* Tracking:
      {makeElement(
        "input",
        { type: "text", value: packageInputState.shipping_id },
        "shipping_id"
      )}
      Shipper:
      {makeElement(
        "select",
        {
          value: packageInputState.shipper,
          children: Object.values(PackageShippers).map((option) => (
            <option>{option}</option>
          )),
        },
        "shipper"
      )}
      Resident:
      {makeElement(
        "select",
        {
          value: packageInputState.recipient,
          children: (
            <>
              <option></option>
              {props.residents.map((resident) => (
                <option value={resident.studentId as string}>
                  {(resident.resident as string) + " (" + resident.room + ")"}
                </option>
              ))}
            </>
          ),
        },
        "recipient"
      )}
      Location:
      {makeElement(
        "select",
        {
          value: packageInputState.location,
          children: Object.values(Closets).map((option) => (
            <option>{option}</option>
          )),
        },
        "location"
      )}
      Notes:
      {makeElement(
        "input",
        {
          value: packageInputState.notes,
          type: "text",
          onChange: (event: Event) => {
            setPackageInputState((prevState) => ({
              ...prevState,
              // notes: { value: (event.target as HTMLTextAreaElement).value },
              notes: (event.target as HTMLTextAreaElement).value,
            }));
          },
        },
        "notes"
      )} */}
      <input type="submit" value="Submit" />
    </form>
  );
};

export default PackageInputForm;
