import React from "react";

import SelectInput from "./SelectInput";
import { Package } from "../server/models/package";

export function packageInputForm() {
  // TODO: link this to backend and submit form data
  return (
    <form>
      <label htmlFor="id">Tracking: </label>
      <input type="text" id="id"></input>

      <label htmlFor="shipper">Shipper: </label>
      {SelectInput("shipper", ["","Amazon","DHL","FedEx","LaserShip","UPS","USPS","Other"])}
      
      <label htmlFor="resident">Resident: </label>
      <input type="text" id="resident"></input>

      <label htmlFor="location">Location: </label>
      {SelectInput("location", ["","A-C","D-G","H-J","K-L","M-O","P-R","S-V","W-Z","Closet 1","Closet 2","Closet 3","Closet 4"])}

      <label htmlFor="notes">Notes: </label>
      <input type="text" id="notes"></input>

      <input type="submit" value="Submit"/>
    </form>
  )
}