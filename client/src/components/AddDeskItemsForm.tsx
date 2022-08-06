import React, { createElement, Component } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import { post } from "../../utilities";

interface Notes {
  value: string;
}

type DeskItemsState = {
  itemName: string;
  itemCategory: string;
  lastBorrowed: Date;
};

type DeskItemsProps = {
  currentItems: DeskItemInterface[];
  categories: string[];
};

export class AddDeskItemsForm extends Component<
  DeskItemsProps,
  DeskItemsState
> {
  constructor(props: DeskItemsProps) {
    super(props);

    this.state = { itemName: "", itemCategory: "", lastBorrowed: new Date() };
  }

  override render() {
    return (
      <form
        name="addDeskItemsForm"
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();

          if (!this.isValidated() || !this.isUnique()) {
            alert("Please enter item that is not in table!!");
            return;
          }

          post("/api/deskItem/postNewItem", this.state).then((res) => {
            this.setState({
              itemName: "",
              itemCategory: "",
            });
          });
        }}
      >
        Item Category:
        {this.makeElement(
          "select",
          {
            value: this.state.itemCategory,
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
          "itemCategory"
        )}
        Item Name:
        {this.makeElement(
          "input",
          { type: "text", value: this.state.itemName },
          "itemName"
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

  isUnique() {
    return this.props.currentItems.every((item) => {
      return item.itemName !== this.state.itemName;
    });
  }
}