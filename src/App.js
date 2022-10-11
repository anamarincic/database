import { useEffect, useState } from "react";
import { ListOfDogs } from "./components/ListOfDogs";
import { Select } from "./components/Select";

function App() {
  const [data, setData] = useState({});
  const [sort, setSort] = useState(false);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    (() => {
      return fetch(
        "https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs.json"
      ).then((response) => {
        return response.json();
      });
    })()
      .then((data) => {
        setData(data.breed);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sort]);

  const sorting = (property) => {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      let results =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return results * sortOrder;
    };
  };

  const handleChange = (e) => {
    setSort(true);
    setSortedData(data.sort(sorting(e)));
  };

  const handleClick = (e) => {
    setSort(false);
    fetch(
      "https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data.breed);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterData = (e) => {
    //console.log(e.target.textContent);
    let filter = e.target.textContent;
    fetch(
      `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/breed.json?orderBy="origin"&equalTo="${filter}"`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let dataDogs;

  if (Array.isArray(data)) {
    dataDogs = data.map((dog) => (
      <ListOfDogs key={dog.id} name={dog.name} origin={dog.origin} />
    ));
  } else {
    dataDogs = Object.keys(data).map((id) => (
      <ListOfDogs key={id} name={data[id].name} origin={data[id].origin} />
    ));
  }

  console.log(data);

  return (
    <div className="App">
      <h1>Dogs breed</h1>
      <Select onChange={handleChange} />
      <button onClick={handleClick}>Reset</button>
      <button onClick={filterData}>Croatia</button>
      <button onClick={filterData}>Germany</button>
      <ul>{!sort && dataDogs}</ul>
      {sort && (
        <ul>
          {sortedData.map((dog) => {
            return (
              <li key={dog.id}>
                <h2>{dog.name}</h2>
                <p>Origin: {dog.origin}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
