import { Button } from "../Button";
import { Link } from "react-router-dom";
import "./ListOfDogs.styles.css";

export function ListOfDogs(props) {
  if (props.loading) {
    return <h2>Loading...</h2>;
  }

  const allDogs = props.posts.map((dog) => (
    <li key={dog.id} className="list__item" id={dog.id}>
      <h2 className="list__item__heading">{dog.name}</h2>
      <p className="list__item__detail">Energy-level: {dog.energyLevel}</p>
      <Link to={`/edit/${dog.id}`}>
        <Button name="edit" title="Edit" />
      </Link>
    </li>
  ));

  return <ul className="list">{allDogs}</ul>;
}
