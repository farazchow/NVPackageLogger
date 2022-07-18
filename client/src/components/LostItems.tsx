import React from "react";

import { post } from "../../utilities";

export function LostItemForm() {
  // TODO: dropdown for residents
  // TODO: clear entries after submit
  // TODO: add worker when submitting (not to inputform)
  return (
    <form name="lostItemForm">
      <label htmlFor="pht">Upload Photo: </label>
      <input type="file" accept= "image/*" id="pht"></input>

      <label htmlFor="desc">Description: </label>
      <input type="text" id="desc"></input>

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
        shipping_id: (document.getElementById("pht") as HTMLInputElement).value,
        recipient: (document.getElementById("desc") as HTMLInputElement).value,
        createdAt: `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}Z`,
      };
      console.log(body);
      // TODO: change post url
      post("/api/LostItemLoggingURL", body).then((res) => {
        console.log("posted");
        // TODO: insert code here to clear boxes from HTML
      });
    } else {
      console.log("Must fill out all fields!");
    }
  };
};

function handleValidation(document: Document) {
  const allElements = ["pht", "desc"];
  for (var i = 0; i < allElements.length; i++) {
    const el = allElements[i];
    if (!document.body.contains(document.getElementById(el))) {
      return false;
    }
  }
  return true;
}
