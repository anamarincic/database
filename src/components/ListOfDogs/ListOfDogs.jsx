export function ListOfDogs(props) {
  if (props.loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <ul className="list">
      {props.posts.map((dog) => (
        <li key={dog.id} className="list__item">
          <h2 className="list__item__heading">{dog.purpose}</h2>
          <p className="list__item__detail">Energy-level: {dog.energyLevel}</p>
        </li>
      ))}
    </ul>
  );
}
