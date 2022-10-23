import { Button } from "../Button";
import { Link } from "react-router-dom";

export function ListOfDogs(props) {
  if (props.loading) {
    return <h2>Loading...</h2>;
  }

  /* const data = { name: "FILIP" };

  const handleClick = (e) => {
    const targetId = e.target.parentNode.id;
    fetch(
      `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/allDogs/${targetId}.json`,
      {
        method: `PATCH`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };*/

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
