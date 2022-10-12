import { useEffect, useState } from "react";
import { ListOfDogs } from "./components/ListOfDogs";
import { Select } from "./components/Select";
import { Pagination } from "./components/Pagination";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(11);

  ///Get all data
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        "https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/breed.json"
      );
      return await response.json();
    })()
      .then((data) => {
        //data object into array
        setData(Object.values(data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  ///Get current Posts

  const end = currentPage * postPerPage;
  const start = end - postPerPage;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(
        `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/breed.json?orderBy="id"&startAt=${start}&endAt=${end}`
      );
      return await response.json();
    })()
      .then((data) => {
        setPosts(Object.values(data));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  ///Change page
  const paginate = (number) => {
    setCurrentPage(number);
  };

  ///Sorting method
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
    setSortedData(posts.sort(sorting(e)));
  };

  ///Reset Btn
  const handleClick = (e) => {
    setSort(false);
    fetch(
      `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/breed.json?orderBy="id"&startAt=${start}&endAt=${end}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(Object.values(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///Filter method
  const filterData = (e) => {
    let filter = e.target.textContent;
    fetch(
      `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/breed.json?orderBy="origin"&equalTo="${filter}"`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(Object.values(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///Loading message
  const loadingData = () => {
    if (loading) {
      return <h2>Loading...</h2>;
    }
  };

  ///Display posts
  const dataDogs = posts.map((dog) => (
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
            {loadingData()}
            {!sort && dataDogs}
            {sort &&
              sortedData.map((dog) => (
                <ListOfDogs key={dog.id} name={dog.name} origin={dog.origin} />
              ))}
          </ul>
          <Pagination
            postPerPage={postPerPage}
            totalPost={data.length}
            onClick={paginate}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
