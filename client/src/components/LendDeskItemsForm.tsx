import SelectInput from "./SelectInput";
import React, { createElement, Component, useState } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import { post } from "../../utilities";
import { ModalButton } from "./ModalButton";
import { ResidentType } from "../../../server/models/resident";
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
  residents: ResidentType[];
  categories: string[];
};

export const LendDeskItemsForm = (props: DeskItemsProps) => {
  const [lendDeskState, setLendDeskState] = useState({
    itemId: "",
    resident: "",
    category: "",
    categoryItems: Array<string>(),
    lastBorrowed: new Date(),
  });

  function makeElement(T: string, props: any, key: keyof DeskItemsState) {
    const propsWithListener = {
      onChange: (event: Event) => {
        setLendDeskState((prevState) => ({
          ...prevState,
          [key]: (event.target as HTMLTextAreaElement).value,
        }));
        if (key === "category") {
          setLendDeskState((prevState) => ({
            ...prevState,
            categoryItems:
              props.availableItems[(event.target as HTMLTextAreaElement).value],
          }));
        }
      },
      ...props,
    };

    return createElement(T, propsWithListener);
  }

  function isValidated() {
    return Object.values(lendDeskState).every((state) => {
      return state !== "";
    });
  }

  return (
    <form
      name="lendDeskItemsForm"
      onSubmit={async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!isValidated()) {
          return alert("Please select a resident and an item!!");
        }

        post("/api/deskItem/lendItem", lendDeskState)
          .then((res) => {
            setLendDeskState({
              itemId: "",
              resident: "",
              category: "",
              categoryItems: [],
              lastBorrowed: new Date(),
            });
          })
          .then(() => document.location.reload());
      }}
    >
      Resident:
      {makeElement(
        "select",
        {
          value: lendDeskState.resident,
          children: (
            <>
              <option></option>
              {props.residents.map((resident) => (
                <option value={resident.residentID} key={Math.random()}>
                  {[resident.firstName, resident.lastName].join(" ") +
                    " (" +
                    resident.room +
                    ")"}
                </option>
              ))}
            </>
          ),
        },
        "resident"
      )}
      Category
      {makeElement(
        "select",
        {
          value: lendDeskState.category,
          children: (
            <>
              <option> </option>
              {props.categories.map((cat) => (
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
      {makeElement(
        "select",
        {
          value: lendDeskState.itemId,
          children: (
            <>
              <option> </option>
              {lendDeskState.categoryItems
                ? lendDeskState.categoryItems.map((item: any) => (
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
};
