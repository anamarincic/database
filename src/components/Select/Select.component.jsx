export function Select(props) {
  const optionElements = props.options.map((option, index) => (
    <option key={index} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div>
      <label className="label">{props.label}</label>
      <select name={props.name} onChange={props.onChange}>
        {optionElements}
      </select>
    </div>
  );
}
