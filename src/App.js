import { useEffect, useState } from "react";

function App() {
const [dogs, setDogs] = useState([]);

useEffect(() => {
  (() => {
    return fetch("https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs.json")
           .then((response) => { return response.json() });
  })()
  .then((data) => {setDogs(data.breed)})
  .catch((error) => { console.log(error)});
}, [dogs]);

const dataDogs = dogs.map((dog) => (
  <li id={dog.id}>
    <h2>{dog.name}</h2>
    <p>Origin: {dog.origin}</p>
    </li>
));
    console.log(dataDogs);
  
  return (
    <div className="App">
      <h1>Dogs breed</h1>
      <ul>
        {dataDogs}
      </ul>
    </div>
  );
}

export default App;
