import { useEffect, useState } from "react";
import { FormElementSelect } from "./components/FormElementSelect";

function App() {

const [dogs, setDogs] = useState([]);
const [sort, setSort] = useState("descending");

useEffect(() => {
  (() => {
    return fetch("https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs.json")
           .then((response) => { return response.json() });
  })()
  .then((data) => { setDogs(data.breed) })
  .catch((error) => { console.log(error) });
}, [dogs]);

const changeSort = (event) => {
  console.log(event);

  setSort(event); 
}


const dataDogs = dogs.map((dog) => (
  
  <li key={dog.id}>
    <h2>{dog.name}</h2>
    <p>Origin: {dog.origin}</p>
  </li>

));
  
  return (
    <div className="App">
      <h1>Dogs breed</h1>
      <FormElementSelect onSubmit={changeSort} />
      <ul>
        {sort === "ascending" && dataDogs.reverse()}
        {sort === "descending" && dataDogs.sort()}
      </ul>
    </div>
  );
}

export default App;
