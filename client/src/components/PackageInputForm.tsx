import {createElement, Component, SyntheticEvent, ElementType} from "react";
import { IResident } from "../../../server/models/resident";

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

type Props = {
  user: string;
  residents: IResident[];
};

export class PackageInputForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    console.log('props', this.props)
    this.state = {
      shipping_id: "",
      recipient: "",
      shipper: "",
      location: "",
      notes: "",
      workerIn: this.props.user,
      createdAt: new Date(),
    };

  }

  override render() {
    return (
      <form
        name="packageInputForm"
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault();

          if (this.isValidated()) {
            const date = new Date();
            this.setState({
              createdAt: date,
            });

            // print("state before", this.state)

            post("/api/package/postPackage", this.state).then((res) => {
              this.setState({
                shipping_id: "",
                recipient: "",
                shipper: "",
                location: "",
                notes: "",
              });
              document.location.reload();
            });
          } else {
            console.log("Must fill out all fields!");
          }
        }}
      >
        Tracking:
        {/* <input
          type="text"
          value={this.state.shipping_id}
          onChange={(event: React.SyntheticEvent) => {
            this.setState({
              shipping_id: (event.target as HTMLTextAreaElement).value,
            });
          }}
        /> */}
        { this.makeSelect( "input" , {type: "text", value: this.state.shipping_id}, "shipping_id" )}

        
        {/* this.makeSelect(input, {key: this.state.shipping_id }, ) */}

        Shipper:
        <select
          value={this.state.shipper}
          onChange={(event: React.SyntheticEvent) => {
            this.setState({
              shipper: (event.target as HTMLTextAreaElement).value,
            });
          }}
        >
          {[
            "",
            "Amazon",
            "DHL",
            "FedEx",
            "LaserShip",
            "UPS",
            "USPS",
            "Other",
          ].map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
        Resident:
        <select
          value={this.state.recipient}
          onChange={(event: React.SyntheticEvent) => {
            this.setState({
              recipient: (event.target as HTMLTextAreaElement).value,
            });
          }}
        >
          <option></option>
          {this.props.residents.map((resident) => (
            <option value={resident.studentId as string}>
              {(resident.resident as string) + " (" + resident.room + ")"}
            </option>
          ))}
        </select>
        Location:
        <select
          value={this.state.location}
          onChange={(event: React.SyntheticEvent) => {
            this.setState({
              location: (event.target as HTMLTextAreaElement).value,
            });
          }}
        >
          {[
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
          ].map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
        Notes:
        <input
          type="text"
          value={this.state.notes}
          onChange={(event: React.SyntheticEvent) => {
            this.setState({
              notes: (event.target as HTMLTextAreaElement).value,
            });
          }}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }

  makeSelect(T: string, props: object, key: keyof State) {
    return (
    
    T === "input" ? 
    <input
    {...props}
    onChange={(event: SyntheticEvent) => {
      this.setState({
        ...this.state,
        [key]: (event.target as HTMLTextAreaElement).value,
      } )
    }}      
    /> :
    <select
      {...props}
      onChange={(event: SyntheticEvent) => {
        this.setState({
          ...this.state,
          [key]: (event.target as HTMLTextAreaElement).value,
        } )
      }}   
    />
    )

  }

  isValidated() {
    // const allElements = [
    //   this.state.shipping_id,
    //   this.state.recipient,
    //   this.state.shipper,
    //   this.state.location,
    // ];
    // for (var i = 0; i < allElements.length; i++) {
    //   const el = allElements[i];
    //   if (el == "") {
    //     return false;
    //   }
    // }

    return Object.values(this.state).every( (state) => {
      state !== ""
    })

  }
}

export default PackageInputForm;
