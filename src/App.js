import { useEffect, useState } from "react";
import { Form } from "./components/Form";
import { ListOfDogs } from "./components/ListOfDogs";

function App() {
  const [dogs, setDogs] = useState([]);
  const [sort, setSort] = useState("descending");
  const [filter, setFilter] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);

  useEffect(() => {
    (() => {
      return fetch(
        `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs.json`
      ).then((response) => {
        return response.json();
      });
    })()
      .then((data) => {
        setDogs(data.breed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dogs]);

  const handleSubmit = (e) => {
    setSort(e.sortBy);
    setFilter(e.filters);
    for (const dog of dogs) {
      if (filter && !filter.includes(dog.name)) {
        continue;
      }
      setFilteredDogs((state) => [...state, dog]);
    }
  };

  const filterDogs = filteredDogs.map((dog) => (
    <ListOfDogs key={dog.id} name={dog.name} origin={dog.origin} />
  ));

  const dataDogs = dogs.map((dog) => (
    <ListOfDogs key={dog.id} name={dog.name} origin={dog.origin} />
  ));

  let displayDogs = dataDogs;

  return (
    <div className="App">
      <h1>Dogs breed</h1>
      <Form onSubmit={handleSubmit} dataName={dogs} />
      <ul>{displayDogs}</ul>
    </div>
  );
}

export default App;
