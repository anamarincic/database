import { useEffect, useState } from "react";
import { ListOfDogs } from "./components/ListOfDogs";
import { Select } from "./components/Select";
import { Pagination } from "./components/Pagination";
import { Button } from "./components/Button";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(false);
  const [filter, setFilter] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [filterPosts, setFilterPosts] = useState([]);
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
  }, [sort, end, start]);

  ///Change page
  const paginate = (number) => {
    setCurrentPage(number);
  };

  ///Sorting method
  function sorting(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  const handleChange = (e) => {
    setSort(true);
    setSortedData(posts.sort(sorting));
  };

  ///Reset Btn
  const handleClick = (e) => {
    setSort(false);
    setFilter(false);
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
        setFilter(true);
        setFilterPosts(Object.values(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  ///Display posts

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
            <Button name="reset" title="Reset" onClick={handleClick} />
          </div>
          <div className="filter">
            <Button name="filter" title="Croatia" onClick={filterData} />
            <Button name="filter" title="Germany" onClick={filterData} />
            <Button name="filter" title="England" onClick={filterData} />
            <Button name="filter" title="Japan" onClick={filterData} />
          </div>
        </div>
        <main>
          {!sort && (
            <ListOfDogs
              posts={filter ? filterPosts : posts}
              loading={loading}
            />
          )}
          {sort && (
            <ListOfDogs
              posts={!filter ? sortedData : filterPosts}
              loading={loading}
            />
          )}
          <Pagination
            postPerPage={postPerPage}
            totalPost={filter ? filterPosts.length : data.length}
            onClick={paginate}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
