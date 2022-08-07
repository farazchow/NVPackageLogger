import React, { SyntheticEvent, useEffect, useState } from "react";
import { ForwardPackageInterface } from "../../../server/models/forwardpackage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { post } from "../../utilities";

export function ForwardPackages(){
    const [data, setData] = useState<ForwardPackageInterface[]>([]);

  useEffect(() => {
    async function getData() {
      fetch("/api/notes/getForwardPackages")
        .then((res) => res.json())
        .then((data) => setData(data));
    }
    getData();
  }, []);

  async function archiveNote(evt: SyntheticEvent, key: number) {
    const note = data[key];
    const date = new Date();

    const body = {
      note: note.note,
      deskworker: note.deskworker,
      createdAt: note.createdAt,
      loggedAt: date,
    };
    post("/api/notes/archiveNote", body).then((res) => {
      console.log("Note archived!");
    });
    post("/api/notes/deleteNote", body).then((res) => {
      console.log(`Package deleted from working db`);
      document.location.reload();
    });
  }
    return (
        <>
            <h2>Forward Packages</h2>
            <ForwardPackagesForm/>
        </>

    )
}
 

const ForwardPackagesForm = () => {
    return (
        <>
        <div>
        <form onSubmit={(e: React.SyntheticEvent) => {
                    e.preventDefault();
                    const target = e.target as typeof e.target & {
                      tracking: { value: string },
                      deskworker: { value: string },
                    };
                    const note = {
                      "note": target.note.value,
                      "deskworker": target.deskworker.value,
                      "createdAt": new Date()
                    }
                    post("/api/notes/addNote", note).then((res) => {
                      console.log("note added!");
                      document.location.reload();
                    });
                }} className = "form-inline" name = "PackageForwardForm">
            <p>
                <label>
                Tracking:  <input type="text" name="id"/>
                </label>
            </p>
            <p>
                <label>
                Shipper: 
                <select className="select-shipper" aria-label="Default select example">
                    <option value=""></option>
                    <option value="Amazon">Amazon</option>
                    <option value="DHL">DHL</option>
                    <option value="FedEx">FedEx</option>
                    <option value="LaserShip">LaserShip</option>
                    <option value="UPS">UPS</option>
                    <option value="USPS">USPS</option>
                    <option value="Other">Other</option>
                </select>
                </label>
            </p>
            <p>
                <label>
                Resident: <input type="text" name="resident"/>
                </label>
            </p>
            <p>
                <label>
                Notes: <input type="text" name="notes"/>
                </label>
            </p>
            <p>
                <input type="submit" value="Submit"/>
            </p>
        </form>
        </div>
        </>
    )}
  
  export default ForwardPackages;  