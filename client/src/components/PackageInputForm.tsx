import React from "react";

import SelectInput from "./SelectInput";
import { post } from "../../utilities";

export function PackageInputForm() {
  // TODO: dropdown for residents
  // TODO: add worker when submitting (not to inputform)
  return (
    <form name="packageInputForm">
      <label htmlFor="id">Tracking: </label>
      <input type="text" id="id"></input>

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

type Props = {
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

export class PackageInputForm extends Component<Props, packageState> {
  constructor(props: Props) {
    super(props);

    console.log("props", this.props);
    this.state = {
      shipping_id: "",
      recipient: "",
      shipper: "",
      location: "",
      // notes: { value: "" },
      notes: " ",
      workerIn: this.props.user,
      createdAt: new Date(),
    };
  }

  override render() {
    return (
      <form
        name="packageInputForm"
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();

          if (!this.isValidated()) {
            console.log("Please fill out all fields");
            alert("GRRR!");
          }

          post("/api/package/postPackage", this.state).then((res) => {
            // console.log("posted", res);
            this.setState({
              shipping_id: "",
              recipient: "",
              shipper: "",
              location: "",
              // notes: { value: "" },
              notes: " ", // NOTE: space added so validate doesn't complain
            });
          });
        }}
      >
        Tracking:
        {this.makeElement(
          "input",
          { type: "text", value: this.state.shipping_id },
          "shipping_id"
        )}
        Shipper:
        {this.makeElement(
          "select",
          {
            value: this.state.shipper,
            children: Object.values(PackageShippers).map((option) => (
              <option>{option}</option>
            )),
          },
          "shipper"
        )}
        Resident:
        {this.makeElement(
          "select",
          {
            value: this.state.recipient,
            children: (
              <>
                <option></option>
                {this.props.residents.map((resident) => (
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
        {this.makeElement(
          "select",
          {
            value: this.state.location,
            children: Object.values(Closets).map((option) => (
              <option>{option}</option>
            )),
          },
          "location"
        )}
        Notes:
        {this.makeElement(
          "input",
          {
            value: this.state.notes,
            type: "text",
            onChange: (event: Event) => {
              this.setState((prevState) => ({
                ...prevState,
                // notes: { value: (event.target as HTMLTextAreaElement).value },
                notes: (event.target as HTMLTextAreaElement).value,
              }));
            },
          },
          "notes"
        )}
        <input type="submit" value="Submit" />
      </form>
    );
  }

  makeElement(T: string, props: any, key: keyof packageState) {
    const propsWithListener = {
      onChange: (event: Event) => {
        this.setState((prevState) => ({
          ...prevState,
          [key]: (event.target as HTMLTextAreaElement).value,
        }));
      },
      ...props,
    };

function handleValidation(document: Document) {
  const allElements = ["id", "resident", "shipper", "location", "notes"];
  for (var i = 0; i < allElements.length; i++) {
    const el = allElements[i];
    if (!document.body.contains(document.getElementById(el))) {
      return false;
    }
  }
  return true;
}
