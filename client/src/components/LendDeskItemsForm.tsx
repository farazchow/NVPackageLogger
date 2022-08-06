import SelectInput from "./SelectInput";
import React, { createElement, Component } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import { post } from "../../utilities";
import { ModalButton } from "./ModalButton";
import { IResident } from "../../../server/models/resident";

type Dictionary = {
  [x: string]: Dictionary;
};

interface Notes {
  value: string;
}

type DeskItemsState = {
  lastBorrowed: Date;
  item: string;
  resident: string;
};

type DeskItemsProps = {
  itemsDict: Dictionary;
  itemNames: string[];
  residents: IResident[];
};

export class LendDeskItemsForm extends Component<
  DeskItemsProps,
  DeskItemsState
> {
  constructor(props: DeskItemsProps) {
    super(props);

    this.state = { item: "", resident: "", lastBorrowed: new Date() };
  }
  override render() {
    return (
      <form
        name="lendDeskItemsForm"
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();

          if (!this.isValidated()) {
            alert("Please enter item that is not in table!!");
            return;
          }

          post("/api/deskItem/lendItem", this.state).then((res) => {
            this.setState({
              item: "",
              resident: "",
            });
          });
        }}
      >
        Resident:
        {this.makeElement(
          "select",
          {
            value: this.state.resident,
            children: (
              <>
                <option></option>
                {this.props.residents.map((resident) => (
                  <option value={resident.studentId as string}>
                    {(resident.resident as string) + " (" + resident.room + ")"}
                  </option>
                ))}
              </>
            ),
          },
          "resident"
        )}
        Item:
        {this.makeElement(
          "input",
          { type: "text", value: this.state.item },
          "item"
        )}
        <input type="submit" value="Submit" />
      </form>
    );
  }

  makeElement(T: string, props: any, key: keyof DeskItemsState) {
    const propsWithListener = {
      onChange: (event: Event) => {
        this.setState((prevState) => ({
          ...prevState,
          [key]: (event.target as HTMLTextAreaElement).value,
        }));
      },
      ...props,
    };

    return createElement(T, propsWithListener);
  }

  isValidated() {
    return Object.values(this.state).every((state) => {
      return state !== "";
    });
  }
}
