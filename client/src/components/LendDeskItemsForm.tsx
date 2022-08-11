import SelectInput from "./SelectInput";
import React, { createElement, Component } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import { post } from "../../utilities";
import { ModalButton } from "./ModalButton";
import { IResident } from "../../../server/models/resident";
import { PathEnumOrString } from "mongoose/types/inferschematype";

interface Notes {
  value: string;
}

type DeskItemsState = {
  lastBorrowed: Date;
  itemId: string;
  resident: string;
  category: string;
  filteredItems: DeskItemInterface[];
  filterValue: string;
};

type DeskItemsProps = {
  residents: IResident[];
  categories: string[];
  availableItems: DeskItemInterface[];
  borrowedItems: DeskItemInterface[];
  allItems: DeskItemInterface[];
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
      lastBorrowed: new Date(),
      filteredItems: this.props.availableItems,
      filterValue: "",
    };
  }

  filterData(value: string) {
    console.log("in filter data", this.state.filteredItems);
    this.setState({
      filterValue: value,
      filteredItems: this.props.availableItems.filter(
        (data: DeskItemInterface) =>
          data.itemCategory.startsWith(this.state.category) &&
          data.itemName.toLowerCase().startsWith(value.toLowerCase())
      ),
    });
  }

  resetOptions() {
    this.setState({
      filteredItems: this.props.availableItems.filter(
        (data: DeskItemInterface) => data.itemCategory === this.state.category
      ),
    });
  }

  override render() {
    return (
      <form
        name="lendDeskItemsForm"
        onSubmit={async (e: React.SyntheticEvent) => {
          e.preventDefault();
          console.log(this.state);
          if (!this.isValidated()) {
            return alert("Please select a resident and an item!!");
          }

          post("/api/deskItem/lendItem", this.state)
            .then((res) => {
              this.setState({
                itemId: "",
                resident: "",
                category: "",
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
            children: (
              <>
                <option></option>
                {this.props.residents.map((resident) => (
                  <option
                    value={resident.studentId as string}
                    key={resident.studentId}
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
        <input
          type="text"
          className="textSelect"
          onChange={(event) => this.filterData(event.target.value)}
        />
        {this.makeElement(
          "select",
          {
            value: this.state.itemId,
            children: (
              <>
                <option> </option>
                {this.state.filteredItems.map((item) => (
                  <option value={item.itemName as string} key={item.id}>
                    {item.itemName as string}
                  </option>
                ))}
              </>
            ),
          },
          "itemId"
        )}
        {/* <select
          value={this.state.itemId}
          onChange={(event) => this.setState({ itemId: event.target.value })}
        >
          {this.state.filteredItems
            ? this.state.filteredItems.map((item: any) => (
                <option value={item.id as string} key={item.id}>
                  {item.itemName as string}
                </option>
              ))
            : []}
        </select> */}
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
          this.resetOptions();
        }
      },
      ...props,
    };

    return createElement(T, propsWithListener);
  }

  isValidated() {
    return true;
  }
}
