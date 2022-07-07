import React from "react";

import SelectInput from "./SelectInput";

class PackageInputForm extends React.Component<any, any> {
    // TODO: MAKE 'NAMES' A DROPDOWN MENU USING RESIDENT INFO
    constructor(props: {}) {
      super(props);
      this.state = {
        id: '',
        shipper: '',
        resident: '',
        location: '',
        notes: '',
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleValidation = this.handleValidation.bind(this);
    }
  
    handleChange(event: any) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event: any) {
      // TODO: FIGURE OUT HOW TO SUBMIT MONGO FORMS
      /*
      const postURL = 'http://localhost:3000/';
      const date = new Date();
      fetch(postURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            __v: 0,
            _id: this.state.id,
            createdAt: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}Z`,
            name: this.state.resident,
          })
      })
      */
      event.preventDefault();
      if (this.handleValidation()){
        console.log(
          `Tracking: ${this.state.id}\r\n
          Shipper: ${this.state.shipper}\r\n
          Resident: ${this.state.resident}\r\n
          Location: ${this.state.location}\r\n
          Notes: ${this.state.notes}`);
        
        this.setState({
          id: '',
          shipper: '',
          resident: '',
          location: '',
          notes: '',
        })
      }
      else console.log("Must fill out all fields!");
    }
  
    handleValidation() {
      return Object.keys(this.state).every((key: string) => this.state[key] !== '');
    }
  
    override render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Tracking: <input type="text" name="id" value={this.state.id} onChange={this.handleChange}/>
          </label>
          <label>
            Shipper: <SelectInput name="shipper" value={this.state.shipper} onChange={this.handleChange} options={["","Amazon","DHL","FedEx","LaserShip","UPS","USPS","Other"]}/>
          </label>
          <label>
            Resident: <input type="text" name="resident" value={this.state.resident} onChange={this.handleChange}/>
          </label>
          <label>
            Location: <SelectInput name="location" value={this.state.location} onChange={this.handleChange} options={["","A-C","D-G","H-J","K-L","M-O","P-R","S-V","W-Z","Closet 1","Closet 2","Closet 3","Closet 4"]}/>
          </label>
          <label>
            Notes: <input type="text" name="notes" value={this.state.notes} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Log Package"/>
        </form>
      )
    }
  }

export default PackageInputForm