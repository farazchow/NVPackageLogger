import React from "react";

import SelectInput from "./SelectInput";
import { post } from "../../utilities";

type State = {
  shipping_id: string;
  recipient: string;
  shipper: string;
  location: string;
  notes: string;
  workerIn: string;
  createdAt: Date;
};
export class PackageInputForm extends React.Component<{}, State> {
  override state = {
    shipping_id: "",
    recipient: "",
    shipper: "",
    location: "",
    notes: "",
    workerIn: "temporary worker",
    createdAt: new Date(),
  };

  override render() {
    return (
      <form
        name="packageInputForm"
        onSubmit={(e: React.SyntheticEvent) => {
          if (handleValidation(document)) {
            e.preventDefault();

            const date = new Date();
            const target = e.target as typeof e.target & {
              id: { value: string };
              resident: { value: string };
              shipper: { value: string };
              location: { value: string };
              notes: { value: string };
              workerIn: { value: string };
            };

            console.log(target);
            this.state.shipping_id = target.id.value;
            this.state.recipient = target.resident.value;
            this.state.shipper = target.shipper.value;
            this.state.location = target.location.value;
            this.state.notes = target.notes.value;
            this.state.workerIn = "temporary worker";
            this.state.createdAt = date;

            post("/api/package/postPackage", this.state).then((res) => {
              this.state.shipping_id = "";
              this.state.recipient = "";
              this.state.shipper = "";
              this.state.location = "";
              this.state.notes = "";
              this.state.workerIn = "";
              console.log("Posted!");
            });
          } else {
            console.log("Must fill out all fields!");
          }
        }}
      >
        <label htmlFor="id">Tracking: </label>
        <input type="text" autoFocus id="id"></input>

        <label htmlFor="shipper">Shipper: </label>
        {SelectInput("shipper", [
          "",
          "Amazon",
          "DHL",
          "FedEx",
          "LaserShip",
          "UPS",
          "USPS",
          "Other",
        ])}

        <label htmlFor="resident">Resident: </label>
        <input type="text" id="resident"></input>

        <label htmlFor="location">Location: </label>
        {SelectInput("location", [
          "",
          "A-C",
          "D-G",
          "H-J",
          "K-L",
          "M-O",
          "P-R",
          "S-V",
          "W-Z",
          "Closet 1",
          "Closet 2",
          "Closet 3",
          "Closet 4",
        ])}

        <label htmlFor="notes">Notes: </label>
        <input type="text" id="notes"></input>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function handleValidation(document: Document) {
  const allElements = ["id", "resident", "shipper", "location", "notes"];
  for (var i = 0; i < allElements.length; i++) {
    const el = allElements[i];
    if ((document.getElementById(el) as HTMLInputElement).value == "") {
      return false;
    }
  }
  return true;
}

export default PackageInputForm;
