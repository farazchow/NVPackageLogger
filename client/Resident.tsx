import React, { useEffect, useState } from "react";
import SelectInput from "./SelectInput";

class CheckInOut extends React.Component<any, any> {
  override render(): React.ReactNode {
    return (
      <>
        <h1>Resident Check-in/Check-out</h1>
        {/* <CheckInOutInputForm /> */}
        <br></br>
      </>
    );
  }
}

// TO-DO: will be rewritten

// class CheckInOutInputForm extends React.Component<any, any> {
//   // TODO: MAKE 'NAMES' A DROPDOWN MENU USING RESIDENT INFO
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       id: "",
//       resident: "",
//       room: "",
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleValidation = this.handleValidation.bind(this);
//   }
//   handleChange(event: any) {
//     this.setState({ [event.target.name]: event.target.value });
//   }

//   handleSubmit(event: any) {
//     // TODO: FIGURE OUT HOW TO SUBMIT MONGO FORMS
//     /*
//         const postURL = 'http://localhost:3000/';
//         const date = new Date();
//         fetch(postURL, {
//             method: 'POST',
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               __v: 0,
//               _id: this.state.id,
//               createdAt: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}Z`,
//               name: this.state.resident,
//             })
//         })
//         */
//     event.preventDefault();
//     if (this.handleValidation()) {
//       this.setState({
//         id: "",
//         resident: "",
//         room: "",
//       });
//     } else console.log("Must fill out all fields!");
//   }
//   handleValidation() {
//     return Object.keys(this.state).every(
//       (key: string) => this.state[key] !== ""
//     );
//   }

//   override render() {
//     return (
//       <>
//         <form onSubmit={this.handleSubmit}>
//           <label>
//             ID:{" "}
//             <input
//               type="text"
//               name="id"
//               value={this.state.id}
//               onChange={this.handleChange}
//             />
//           </label>
//           <label>
//             Resident:{" "}
//             <input
//               type="text"
//               name="resident"
//               value={this.state.resident}
//               onChange={this.handleChange}
//             />
//           </label>
//           <label>
//             Room:{" "}
//             <input
//               type="text"
//               name="room"
//               value={this.state.room}
//               onChange={this.handleChange}
//             />
//           </label>
//           {/* <label>
//             Type:{" "}
//             <SelectInput
//               name="type"
//               onChange={this.handleChange}
//               options={["Check-in", "Check-out"]}
//             />
//           </label> */}
//           <input type="submit" value="Submit" />
//         </form>
//       </>
//     );
//   }
// }
export default CheckInOut;
