import React from "react";

import SelectInput from "./SelectInput";
import { post } from "../../utilities";

export function AddDeskItemsForm() {
  // TODO: validate that there are no duplicates

  return (
    <form name="addDeskItemsForm">
      <label htmlFor="itemName">Item Name: </label>
      <input type="text" id="itemName"></input>

      <input type="submit" value="Submit" onClick={clickHandler()} />
    </form>
  );
}

const clickHandler = () => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    const date = new Date();
    const body = {
      itemName: (document.getElementById("itemName") as HTMLInputElement).value,
      lastBorrowed: date,
    };
    post("/api/deskItem/postNewItem", body).then((res) => {
      (document.getElementById("itemName") as HTMLInputElement).value = "";
    });
  };
};
