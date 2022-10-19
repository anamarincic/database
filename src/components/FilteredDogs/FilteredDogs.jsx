export function FilteredDogs(props) {
  return (
    <ul className="list">
      {props.posts.map((dog) => (
        <li>{dog}</li>
      ))}
    </ul>
  );
}
