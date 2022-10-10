export function ListOfDogs(props) {
  return (
    <li key={props.id}>
      <h2>{props.name}</h2>
      <p>Origin: {props.origin}</p>
    </li>
  );
}
