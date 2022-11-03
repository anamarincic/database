import { DataStore } from "../../Stores/DataStore";
import { Button } from "../../Components/Button";
import { Header } from "../../Components/Header";
import { useParams } from "react-router-dom";
import { useInstance, provider } from "react-ioc";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import "./DogModal.styles.css";

export const DogModal = provider(DataStore)(
  observer(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dataStore = useInstance(DataStore);
    const [error, setError] = useState(null);
    const [state, setState] = useState({
      name: "",
      energyLevel: "",
      group: "",
    });
    const { name, energyLevel } = state;
    const { id } = useParams();
    const dog = dataStore.dogsData[id];

    useEffect(() => {
      if (id) {
        if (id >= 0 && id < dataStore.dogsData.length) {
          dataStore.id = id;
          setState({ ...dog });
        }
      } else {
        setState({ name: "", energyLevel: "" });
      }

      return () => {
        setState({ name: "", energyLevel: "" });
      };
    }, [id, dataStore, dog]);

    const handleInputChange = (e) => {
      console.log(e);
      const { name, value } = e.target;
      setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!name || !energyLevel) {
        setError("Please provide value in each input field");
      } else {
        if (id) {
          dataStore.updateDog({
            name: state.name,
            energyLevel: state.energyLevel,
            id: id,
          });
          alert("Dog updated successfully");
        } else {
          dataStore.createDog({
            name: state.name,
            energyLevel: state.energyLevel,
            id: dataStore.dogsData.length,
          });
          dataStore.filterQuery = state.group;
          dataStore.updateGroupOfDogs(state.name);
          alert("Dog added successfully");
        }
      }
    };
    return (
      <div>
        <Header />
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={state.name || ""}
            placeholder="Dog's name.."
            onChange={handleInputChange}
          />
          <label htmlFor="energyLevel">Energy-level:</label>
          <input
            type="number"
            id="energyLevel"
            name="energyLevel"
            value={state.energyLevel || ""}
            placeholder="Energy level..."
            onChange={handleInputChange}
          />
          {!id && <label htmlFor="name">Group:</label>}
          {!id && (
            <input
              type="text"
              id="group"
              name="group"
              value={state.group || ""}
              placeholder="Which group dog belongs.."
              onChange={handleInputChange}
            />
          )}
          <Button type="submit" title={id ? "Update" : "Save"} name="add" />
          {error}
        </form>
      </div>
    );
  })
);
