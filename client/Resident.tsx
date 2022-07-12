import React, { FunctionComponent, useEffect, useState } from "react";

export const CheckInOut: FunctionComponent = () => {
  return (
      <>
        <h1>Resident Check-in/Check-out</h1>
        <CheckInOutInputForm/><br></br>
      </>
    )
  }

type State = {
  id: string,
  resident: string,
  room: string,
};

class CheckInOutInputForm extends React.Component<{}, State> {
    override state = {
      id: "",
      resident: "",
      room: "",
    };
    
      override render() {
        return (
          <>
          <form onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                id: { value: string },
                resident: { value: string },
                room: { value: string },
                type: { value: string },
              };
              this.state.id = target.id.value;
              this.state.resident = target.resident.value;
              this.state.room = target.room.value;

              console.log("submitted %s %s %s",this.state.id,this.state.resident,this.state.room)
          }}>
            <label>
              ID: <input type="text" name="id"/>
            </label>
            <label>
              Resident: <input type="text" name="resident" />
            </label>
            <label>
              Room: <input type="text" name="room"/>
            </label>
            <input type="submit" value="Submit"/>
          </form>
          </>
          
        )
      }
    }