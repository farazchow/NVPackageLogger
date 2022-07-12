export default function SelectInput(name: string, options: Array<string>) {
  function makeOptions() {
    return options.map((i) => <option value={i}>{i}</option>)
  }
  return (
    <select name={name}>
      {makeOptions()}
    </select>
  )
}
