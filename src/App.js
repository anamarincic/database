import { useEffect, useState } from "react";
import { ListOfDogs } from "./components/ListOfDogs";
import { Select } from "./components/Select";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(false);
  const [sortedData, setSortedData] = useState([]);

  /****Fetch data + orderBy***********/
  let currentPage = 0;
  let rows = 11;

  const start = currentPage * rows;
  const end = start + rows;

  const url = `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/breed.json?orderBy="id"&startAt=${start}&endAt=${end}`;
  useEffect(() => {
    (() => {
      return fetch(url).then((response) => {
        return response.json();
      });
    })()
      .then((data) => {
        //data object into array
        setData(Object.values(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sort]);

  /****sorting method********/
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

  /******Reset Btn*******/
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

  /*******Filter method******/
  const filterData = (e) => {
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
      <header>
        <h1 className="header__heading">Dogs breed</h1>
      </header>
      <div className="wrapper">
        <div className="aside">
          <div className="sort">
            <Select onChange={handleChange} />
          </div>
          <div className="reset">
            <button
              className="button reset__button button--hover"
              onClick={handleClick}>
              Reset
            </button>
          </div>
          <div className="filter">
            <button
              className="button filter__button button--hover"
              onClick={filterData}>
              Croatia
            </button>
            <button
              className="button filter__button button--hover"
              onClick={filterData}>
              Germany
            </button>
            <button
              className="button filter__button button--hover"
              onClick={filterData}>
              England
            </button>
          </div>
        </div>
        <main>
          <ul className="list">
            {!sort && dataDogs}
            {sort &&
              sortedData.map((dog) => (
                <ListOfDogs key={dog.id} name={dog.name} origin={dog.origin} />
              ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

export default App;
