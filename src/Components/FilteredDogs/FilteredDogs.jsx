import "./FilteredDogs.styles.css";

export function FilteredDogs(props) {
  const allDogs = props.posts.map((dog) => (
    <li key={dog.id} className="list__item--filtered" id={dog.id}>
      {dog}
    </li>
  ));

  return <ul className="list">{allDogs}</ul>;
}
