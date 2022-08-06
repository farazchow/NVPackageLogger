import SelectInput from "./SelectInput";
import { FunctionComponent, ReactComponentElement, useEffect, useState } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import { post } from "../../utilities";
import { ModalButton } from "./ModalButton";

type Dictionary = {
  [x: string]: Dictionary;
};


export const LendDeskItemsForm = () => {
  const [itemsDict, setItemsDict] = useState<Dictionary>({});
  const [itemNames, setItemNames] = useState<string[]>([""]);

  // TODO: dropdown for resients
  useEffect(() => {
    async function getData() {
      console.log("starting to fetch available items");
      const result = await (
        await fetch("/api/deskItem/getAvailableItems")
      ).json();

      for (let key in result) {
        setItemNames((itemNames) => [...itemNames, result[key].itemName]);
        setItemsDict((itemsDict) => {
          itemsDict[result[key].itemName] = result[key];
          return itemsDict;
        });
      }
    }
    getData();
  }, []);

  console.log(itemsDict);

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("hi");
    console.log(itemsDict);
    console.log(document);
    console.log(document.getElementById("item") as HTMLInputElement);
    const date = new Date();
    const body = {
      itemId:
        itemsDict[(document.getElementById("item") as HTMLInputElement).value]
          ._id,
      residentId: (document.getElementById("resident") as HTMLInputElement)
        .value,
      lastBorrowed: date,
    };
    console.log(body);
    post("/api/deskItem/lendItem", body).then((res) => {
      // reset stuff
      (document.getElementById("item") as HTMLInputElement).value = "";
      (document.getElementById("resident") as HTMLInputElement).value = "";
      (document.getElementById("note") as HTMLInputElement).value = "";
      // document.location.reload();
    });
  };

  return (
    <>
    <form name="lendDeskItemsForm">
      <label htmlFor="resident">Resident: </label>
      <input type="text" id="resident"></input>
      <label htmlFor="item">Item: </label> 
      {SelectInput("item", itemNames)}
      <label htmlFor = "note">Notes: </label>
      <input type="text" id="note"></input>

      <input type="submit" value="Submit" onClick={clickHandler} />
      
    </form>
      
      { <ModalButton/> }    
    </>


  );
}



