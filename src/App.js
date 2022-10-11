import { useEffect, useState } from "react";
import { ListOfDogs } from "./components/ListOfDogs";
import { Select } from "./components/Select";

function App() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(false);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    (() => {
      return fetch(
        `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/breed.json?orderBy="id"&startAt=0&endAt=5`
      ).then((response) => {
        return response.json();
      });
    })()
      .then((data) => {
        setData(Object.values(data));
        //console.log(Object.values(data));
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
      `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/breed.json?orderBy="id"&startAt=0&endAt=5`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(Object.values(data));
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
        setData(Object.values(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dataDogs = data.map((dog) => (
    <ListOfDogs key={dog.id} name={dog.name} origin={dog.origin} />
  ));

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
          {sortedData.map((dog) => (
            <ListOfDogs key={dog.id} name={dog.name} origin={dog.origin} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
