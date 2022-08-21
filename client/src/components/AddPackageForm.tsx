import {
  createElement,
  Component,
  SyntheticEvent,
  ElementType,
  JSXElementConstructor,
  useState,
} from "react";
import {
  Closets,
  PackageCarrier,
  emptyPackage,
  pckge,
} from "../../../server/models/package";
import { resident } from "../../../server/models/resident";

import { post } from "../../utilities";
import { useAuth } from "../auth/useAuth";

type PackageInputProps = {
  residents: resident[];
};

export class ENUMS {
  static Closets = Closets;
  static PackageCarrier = PackageCarrier;
}
export const AddPackageForm = ({ residents }: PackageInputProps) => {
  const { user } = useAuth();
  const [pckge, setPckge] = useState<pckge>({
    ...emptyPackage,
    loggedBy: user ? user.kerb : " ",
  });

  setTimeout(() => {
    setPckge((prevPckg) => ({ ...prevPckg, receivedAt: new Date() }));
  }, 100);

  function makeElement(T: string, props: pckge, key: string) {
    // console.log("T is", T);
    const propsWithListener = {
      onChange: (event: Event) => {
        setPckge((prevState: pckge) => ({
          ...prevState,
          [key]: (event.target as HTMLTextAreaElement).value,
        }));
      },
      ...props,
    };

    return createElement(T, propsWithListener);
  }

  function isValidated() {
    return Object.values(pckge).every((state) => {
      return state !== "";
    });
  }
  const formInputs = [
    {
      title: "Tracking#:",
      type: "input",
      attribute: "trackingNo",
      children: { type: "text", value: pckge.trackingNo },
    },
    {
      title: "Carrier:",
      type: "select",
      attribute: "carrier",
      children: {
        value: pckge.carrier,
        children: Object.values(PackageCarrier).map((option) => (
          <option key={option}>{option}</option>
        )),
      },
    },
    {
      title: "Recipient:",
      type: "select",
      attribute: "recipient",
      children: {
        value: pckge.recipient,
        children: (
          <>
            <option></option>
            {residents.map((resident, index) => (
              <option value={resident.residentID} key={index}>
                {[resident.firstName, resident.lastName].join(" ") +
                  "(" +
                  (resident.semesters.length
                    ? resident.semesters[resident.semesters.length - 1].room
                    : "No Room") +
                  ")"}
              </option>
            ))}
          </>
        ),
      },
    },

    {
      title: "Recipient Kerb:",
      type: "select",
      attribute: "recipientKerb",
      children: {
        value: pckge.recipientKerb,
        children: (
          <>
            <option key={"specialkey"}></option>
            {residents.map((resident: resident) => {
              return (
                <option key={resident._id.toString()}>
                  {resident.kerb.toString()}
                </option>
              );
            })}
          </>
        ),
      },
    },

    {
      title: "Location:",
      type: "select",
      attribute: "location",
      children: {
        value: pckge.location,
        children: Object.values(Closets).map((option, index) => (
          <option key={index}>{option}</option>
        )),
      },
    },
    {
      title: "Notes:",
      type: "input",
      attribute: "notes",
      children: {
        value: pckge.notes,
        type: "text",
        onChange: (event: Event) => {
          setPckge((prevState: any) => ({
            ...prevState,
            // notes: { value: (event.target as HTMLTextAreaElement).value },
            notes: (event.target as HTMLTextAreaElement).value,
          }));
        },
      },
    },
    {
      title: "Logged By:",
      type: "input",
      attribute: "loggedBy",
      children: {
        value: pckge.loggedBy,
        type: "text",
        disabled: true,
      },
    },

    {
      title: "Received Timestamp:",
      type: "input",
      attribute: "receivedAt",
      children: {
        value: pckge.receivedAt,
        disabled: true,
      },
    },
    {
      title: "Delivered At",
      type: "input",
      attribute: "receivedAt",
      children: {
        value: pckge.deliveredAt || "Not Yet Delivered!",
        disabled: true,
      },
    },
  ];

  return (
    <form
      name="AddPackage"
      onSubmit={async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!isValidated()) {
          console.log("Please fill out all fields");
          return alert("GRRR!");
        }

        post("/api/package/postPackage", pckge).then((res) => {
          // console.log("posted", res);
          setPckge(emptyPackage);
        });
      }}
    >
      {formInputs.map((input: any) => {
        return (
          <>
            {input.title}
            {makeElement(input.type, input.children, input.attribute)}
          </>
        );
      })}

      <input type="submit" value="Submit" />
      <input type="submit" value="Deliver" />
    </form>
  );
};

export default AddPackageForm;
