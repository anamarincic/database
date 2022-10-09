export function Checkbox(props) {
  const data = props.dataNameFilter;

  var checkbox = data.map((option) => (
    <label key={option.id}>
      <div>{option.name}</div>
      <input
        name={option.name}
        value={option.name}
        type="checkbox"
        onChange={props.onChange}
      />
    </label>
  ));

  return <div>{checkbox}</div>;
}
