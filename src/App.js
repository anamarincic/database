import { useEffect, useState } from "react";
import { Form } from "./components/Form";

function App() {
  const [dogs, setDogs] = useState([]);
  const [sort, setSort] = useState("descending");
  const [filteredDogs, setFilterDogs] = useState([]);

  useEffect(() => {
    (() => {
      return fetch(
        "https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs.json"
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
    //setFilter(e.filters);
    for (const dog of dogs) {
      if (e.filters && !e.filters.includes(dog.name)) {
        continue;
      }
      setFilterDogs((state) => [...state, dog]);
    }
  };

  const filter = filteredDogs.map((dog) => (
    <li key={dog.id}>
      <h2>{dog.name}</h2>
      <p>Origin: {dog.origin}</p>
    </li>
  ));

  const dataDogs = dogs.map((dog) => (
    <li key={dog.id}>
      <h2>{dog.name}</h2>
      <p>Origin: {dog.origin}</p>
    </li>
  ));

  return (
    <div className="App">
      <h1>Dogs breed</h1>
      <Form onSubmit={handleSubmit} dataName={dogs} />
      <ul>{filter}</ul>
      <ul>
        {sort === "ascending"
          ? dataDogs.reverse()
          : sort === "descending" && dataDogs.sort()}
      </ul>
    </div>
  );
}

export default App;
