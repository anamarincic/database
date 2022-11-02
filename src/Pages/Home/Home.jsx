import { useInstance, provider } from "react-ioc";
import { observer } from "mobx-react-lite";
import { DataStore } from "../../Stores/DataStore";
import "./Home.styles.css";
import { Button } from "../../Components/Button";
import { Header } from "../../Components/Header";
import { Select } from "../../Components/Select";
import { useState } from "react";
import { ListOfDogs } from "../../Components/ListOfDogs";
import { Pagination } from "../../Components/Pagination";
import { FilteredDogs } from "../../Components/FilteredDogs";

export const Home = provider(DataStore)(
  observer(() => {
    const store = useInstance(DataStore);
    const [sortedData, setSortedData] = useState([]);
    const [sort, setSort] = useState(false);
    const [filter, setFilter] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(12);

    ///Sorting method
    const sorting = (key, order = "asc") => {
      const sortOrder = order === "asc" ? 1 : -1;
      return (a, b) => {
        const A = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const B = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
        if (A < B) {
          return sortOrder * -1;
        } else if (A > B) {
          return sortOrder * 1;
        } else {
          return 0;
        }
      };
    };

    const handleChange = (e) => {
      setSort(true);
      setSortedData(store.dogsData.sort(sorting(e, "asc")));
      console.log(sortedData);
    };

    ///Change page

    const end = currentPage * postPerPage;
    const start = end - postPerPage;

    const paginate = (number) => {
      setCurrentPage(number);
    };

    ///Get current Posts
    let posts;
    posts = !sort
      ? store.dogsData.slice(start, end)
      : sortedData.slice(start, end);

    ///Reser btn
    const reset = () => {
      setFilter(false);
    };

    ////Filtering Data
    const filterData = (e) => {
      setFilter(true);
      store.filterQuery = e.target.textContent;
      store.getFilteredDogs();
    };
    return (
      <div>
        <Header />
        <div className="wrapper">
          <div className="aside">
            <div className="sort">
              <Select onChange={handleChange} />
            </div>
            <div className="reset">
              <Button name="reset" title="Reset" onClick={reset} />
            </div>
            <h3>7 Major Dog Groups</h3>
            <div className="filter">
              <Button name="filter" title="working" onClick={filterData} />
              <Button name="filter" title="herding" onClick={filterData} />
              <Button name="filter" title="hound" onClick={filterData} />
              <Button name="filter" title="toy" onClick={filterData} />
              <Button name="filter" title="sporting" onClick={filterData} />
              <Button name="filter" title="nonSporting" onClick={filterData} />
              <Button name="filter" title="terrier" onClick={filterData} />
            </div>
          </div>
          <main>
            {!filter && <ListOfDogs posts={posts} />}
            {filter && <FilteredDogs posts={store.filterData} />}
            {!filter && (
              <Pagination
                postPerPage={postPerPage}
                totalPost={store.dogsData.length}
                onClick={paginate}
              />
            )}
          </main>
        </div>
      </div>
    );
  })
);
