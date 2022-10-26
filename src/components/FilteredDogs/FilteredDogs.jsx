import "./FilteredDogs.styles.css";

export function FilteredDogs(props) {
  const filteredDogs = props.posts.map((dog, index) => (
    <li key={index} id={dog.id} className="list__item--filtered">
      {dog}
    </li>
  ));
  return <ul className="list">{filteredDogs}</ul>;
}
