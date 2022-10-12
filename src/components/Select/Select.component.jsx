export function Select(props) {
  const optionElements = props.options.map((option, index) => (
    <option className="sort__options--value" key={index} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <label className="custom__sort">
      <div className="custom__sort__label">{props.label}</div>
      <select name={props.name} onChange={props.onChange}>
        {optionElements}
      </select>
    </label>
  );
}
