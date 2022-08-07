import React from "react";

export default function SelectInput(name: string, options: Array<string>) {
  function makeOptions() {
    return options.map((i) => (
      <option value={i} key={i}>
        {i}
      </option>
    ));
  }
  return (
    <select name={name} id={name}>
      {makeOptions()}
    </select>
  );
}
