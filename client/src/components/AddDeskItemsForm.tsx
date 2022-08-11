import React, { createElement, Component, useState } from "react";
import { DeskItemInterface } from "../../../server/models/deskItem";
import { post } from "../../utilities";

type Notes = {
  value: string;
};

type DeskItemsState = {
  itemName: string;
  itemCategory: string;
  lastBorrowed: Date;
};

type DeskItemsProps = {
  currentItems: DeskItemInterface[];
  categories: string[];
};

export const AddDeskItemsForm = (props: DeskItemsProps) => {
  const [deskItemsState, setDeskItemsState] = useState({
    itemName: "",
    itemCategory: "",
    lastBorrowed: new Date(),
  });

  function makeElement(T: string, props: any, key: keyof DeskItemsState) {
    const propsWithListener = {
      onChange: (event: Event) => {
        setDeskItemsState((prevState) => ({
          ...prevState,
          [key]: (event.target as HTMLTextAreaElement).value,
        }));
      },
      ...props,
    };

    return createElement(T, propsWithListener);
  }

  function isValidated() {
    return Object.values(deskItemsState).every((state) => {
      return state !== "";
    });
  }

  function isUnique() {
    return props.currentItems.every((item) => {
      return item.itemName !== deskItemsState.itemName;
    });
  }

  return (
    <>
      <td>
        <form
          name="addDeskItemsForm"
          onSubmit={async (e: React.SyntheticEvent) => {
            e.preventDefault();

            if (!isValidated() || !isUnique()) {
              return alert("Please enter item that is not in table!!");
            }

            post("/api/deskItem/postNewItem", deskItemsState).then((res) => {
              setDeskItemsState({
                itemName: "",
                itemCategory: "",
                lastBorrowed: new Date(),
              });
            });
          }}
        >
          Item Category:
          {makeElement(
            "select",
            {
              value: deskItemsState.itemCategory,
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
            "itemCategory"
          )}
          Item Name:
          {makeElement(
            "input",
            { type: "text", value: deskItemsState.itemName },
            "itemName"
          )}
          <input type="submit" value="Submit" />
        </form>
      </td>
    </>
  );
};
