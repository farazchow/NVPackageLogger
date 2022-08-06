import React, { useState } from "react";

import SelectInput from "./SelectInput";
import { post } from "../../utilities";

type DeskProps = {
  id: string
}

export const AddDeskItemsForm = (props: DeskProps) => {
  // TODO: validate that there are no duplicates
  const [propsState, setProps]  = useState("")

  console.log('id is', props.id)
  return (
    <form name="addDeskItemsForm">
      <label htmlFor="itemName">Item Name: </label>
      <input type="text" id={props.id}></input>

      <input type="submit" value="Submit" onClick={clickHandler(props.id)} /> 
    </form>
  );

}

const clickHandler = (id: string) => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('gggid is', id)
    const date = new Date();
    console.log('element from ID', id, document.getElementById(id), 
      'element from Id', (document.getElementById(id) as any).value)
    const body = {
      itemName: (document.getElementById(id) as HTMLInputElement).value,
      lastBorrowed: date,
    };
    post("/api/deskItem/postNewItem", body).then((res) => {
      // (document.getElementById(name) as HTMLInputElement).reset();
    });
  };
};


