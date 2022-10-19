export function ListOfDogs(props) {
  if (props.loading) {
    return <h2>Loading...</h2>;
  }

  const allDogs = props.posts.map((group) => (
    <li key={group.id} className="list__item">
      <h2 className="list__item__heading">{group.name}</h2>
      <p className="list__item__detail">Energy-level: {group.energyLevel}</p>
    </li>
  ));

  return <ul className="list">{allDogs}</ul>;
}
