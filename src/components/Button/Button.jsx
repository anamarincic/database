export function Button(props) {
  const btn = "button " + props.name + "__button";
  return (
    <button className={btn} onClick={props.onClick} value={props.value}>
      {props.title}
    </button>
  );
}
