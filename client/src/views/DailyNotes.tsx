import React, { FunctionComponent, useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export const DailyNotes: FunctionComponent = () => {
  return (
      <>
        <h1>Daily Notes</h1>
        <DailyNotesForm/><br></br>
      </>
    )
  }


type State = {
  note: string,
  deskworker: string,
  date: string,
  time: string,
  isSubmitted: boolean
};

class DailyNotesForm extends React.Component<{}, State> {
    override state = {
      note: "",
      deskworker: "",
      date: "",
      time: "",
      isSubmitted: false
    };
    
    override render() {
        return (
            <>
            <br>
            </br>
            <div>
            <form onSubmit={(e: React.SyntheticEvent) => {
                e.preventDefault();
                const target = e.target as typeof e.target & {
                note: { value: string },
                deskworker: { value: string },
                date: { value: string },
                time: { value: string }
                };
                this.state.note = target.note.value;
                this.state.deskworker = target.deskworker.value;
                this.state.date = target.date.value;
                this.state.time = target.time.value;
                this.state.isSubmitted = true;

                console.log("submitted %s %s %s",this.state.note, this.state.deskworker, this.state.date, this.state.time, this.state.isSubmitted);
            }}>
            <p>
                <label>
                Note: <input type="text" name="note"/>
                </label>
            </p>
            
            <p>
                <label>
                Deskworker: <input type="text" name="deskworker" />
                </label>
            </p>
            
            <p>
            <label>
                Date: <input type="text" name="date"/>
            </label>
            </p>

            <p>
            <label>
                Time: <input type="text" name="time"/>
            </label>
            </p>

            <input type="submit" value="Submit"/>
            </form>
            </div>
            </>
            
        )
    }
    }

export default DailyNotes;  