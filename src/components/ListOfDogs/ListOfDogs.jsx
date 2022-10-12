export function ListOfDogs(props) {
  return (
    <li key={props.id} className="list__item">
      <h2 className="list__item__heading">{props.name}</h2>
      <p className="list__item__detail">Origin: {props.origin}</p>
    </li>
  );
}
