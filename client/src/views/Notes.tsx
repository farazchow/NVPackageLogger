import React, { FunctionComponent, useEffect, useState } from "react";
import { post } from "../../utilities";

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
  createdAt: Date,
};

class DailyNotesForm extends React.Component<{}, State> {
    override state = {
      note: "",
      deskworker: "",
      createdAt: new Date(),
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
                  createdAt: {value: Date},
                };
                this.state.note = target.note.value;
                this.state.deskworker = target.deskworker.value;
                this.state.createdAt = new Date()

                post("/api/notes/addNote", this.state).then((res) => {
                  console.log("note added!");
                });
                console.log("submitted %s %s %s",this.state.note, this.state.deskworker, this.state.createdAt);
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

            <input type="submit" value="Submit"/>
            </form>
            </div>
            </>
            
        )
    }
    }

export default DailyNotes;  