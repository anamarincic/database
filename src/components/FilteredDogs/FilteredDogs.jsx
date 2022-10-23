export function FilteredDogs(props) {
  const filteredDogs = props.posts.map((dog, index) => (
    <li key={index} id={dog.id}>
      {dog}
    </li>
  ));
  return <ul>{filteredDogs}</ul>;
}
