import { useInstance, provider } from "react-ioc";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { DogsListViewStore } from "../../Stores/DogsListViewStore";
import "./DogsList.styles.css";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Select } from "../../components/Select";

export const DogsList = provider(DogsListViewStore)(
  observer(() => {
    const store = useInstance(DogsListViewStore);
    return (
      <div>
        <Header />
        <div className="wrapper">
          <div className="aside">
            <div className="sort">
              <Select />
            </div>
            <div className="reset">
              <Button name="reset" title="Reset" />
            </div>
            <h3>7 Major Dog Groups</h3>
            <div className="filter">
              <Button name="filter" title="working" />
              <Button name="filter" title="herding" />
              <Button name="filter" title="hound" />
              <Button name="filter" title="toy" />
              <Button name="filter" title="sporting" />
              <Button name="filter" title="nonSporting" />
              <Button name="filter" title="terrier" />
            </div>
          </div>
          <main>
            <ul className="list">
              {store.dogs.map((dog) => (
                <li key={dog.id} className="list__item" id={dog.id}>
                  <h2 className="list__item__heading">{dog.name}</h2>
                  <p className="list__item__detail">
                    Energy-level: {dog.energyLevel}
                  </p>
                  <Link to="/edit/0">
                    <Button name="edit" title="Edit" />
                  </Link>
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>
    );
  })
);
