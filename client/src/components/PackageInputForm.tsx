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

      <input type="submit" value="Submit" onClick={clickHandler()} />
    </form>
  );
}

const clickHandler = () => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    if (handleValidation(document)) {
      const date = new Date();
      const body = {
        shipping_id: (document.getElementById("id") as HTMLInputElement).value,
        recipient: (document.getElementById("resident") as HTMLInputElement)
          .value,
        shipper: (document.getElementById("shipper") as HTMLInputElement).value,
        location: (document.getElementById("location") as HTMLInputElement)
          .value,
        notes: (document.getElementById("notes") as HTMLInputElement).value,
        workerIn: "temporaryWorkerID",
        createdAt: date,
      };
      console.log(body);
      post("/api/package/postPackage", body).then((res) => {
        console.log("posted");
        (document.getElementById("id") as HTMLInputElement).value = "";
        (document.getElementById("resident") as HTMLInputElement).value = "";
        (document.getElementById("shipper") as HTMLInputElement).value = "";
        (document.getElementById("location") as HTMLInputElement).value = "";
        (document.getElementById("notes") as HTMLInputElement).value = "";
        document.location.reload();
      });
    } else {
      console.log("Must fill out all fields!");
    }
  };
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
