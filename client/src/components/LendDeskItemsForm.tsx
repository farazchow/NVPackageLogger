import SelectInput from "./SelectInput";
import React, { createElement, Component } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import { post } from "../../utilities";
import { ModalButton } from "./ModalButton";
import { IResident } from "../../../server/models/resident";
import { PathEnumOrString } from "mongoose/types/inferschematype";

type DeskItemDictionary = {
  [x: string]: DeskItemInterface[];
};

interface Notes {
  value: string;
}

type DeskItemsState = {
  lastBorrowed: Date;
  itemId: string;
  resident: string;
  category: string;
  categoryItems: DeskItemInterface[];
};

type DeskItemsProps = {
  availableItems: DeskItemDictionary;
  residents: IResident[];
  categories: string[];
};

export class LendDeskItemsForm extends Component<
  DeskItemsProps,
  DeskItemsState
> {
  constructor(props: DeskItemsProps) {
    super(props);

    this.state = {
      itemId: "",
      resident: "",
      category: "",
      categoryItems: [],
      lastBorrowed: new Date(),
    };
  }
  override render() {
    return (
      <form
        name="lendDeskItemsForm"
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();

          if (!this.isValidated()) {
            alert("Please select a resident and an item!!");
            return;
          }

          post("/api/deskItem/lendItem", this.state)
            .then((res) => {
              this.setState({
                itemId: "",
                resident: "",
                category: "",
                categoryItems: [],
              });
            })
            .then(() => document.location.reload());
        }}
      >
        Resident:
        {this.makeElement(
          "select",
          {
            value: this.state.resident,
            // todo: fix this -- current being stored as resident (room#) not studentId
            children: (
              <>
                <option></option>
                {this.props.residents.map((resident) => (
                  <option
                    value={resident.studentId as string}
                    key={Math.random()}
                  >
                    {(resident.resident as string) + " (" + resident.room + ")"}
                  </option>
                ))}
              </>
            ),
          },
          "resident"
        )}
        Category
        {this.makeElement(
          "select",
          {
            value: this.state.category,
            children: (
              <>
                <option> </option>
                {this.props.categories.map((cat) => (
                  <option value={cat as string} key={cat}>
                    {cat as string}
                  </option>
                ))}
              </>
            ),
          },
          "category"
        )}
        Item:
        {this.makeElement(
          "select",
          {
            value: this.state.itemId,
            children: (
              <>
                <option> </option>
                {this.state.categoryItems
                  ? this.state.categoryItems.map((item) => (
                      <option value={item._id as string} key={item._id}>
                        {item.itemName as string}
                      </option>
                    ))
                  : []}
              </>
            ),
          },
          "itemId"
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
        if (key === "category") {
          this.setState((prevState) => ({
            ...prevState,
            categoryItems:
              this.props.availableItems[
                (event.target as HTMLTextAreaElement).value
              ],
          }));
        }
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
