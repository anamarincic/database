import { useInstance, provider } from "react-ioc";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { DataStore } from "../../Stores/DataStore";
import "./DogModal.styles.css";
import { Button } from "../../Components/Button";
import { Header } from "../../Components/Header";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const DogModal = provider(DataStore)(
  observer(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dataStore = useInstance(DataStore);
    const [error, setError] = useState(null);
    const [state, setState] = useState({
      name: "",
      energyLevel: null,
    });
    const { name, energyLevel } = state;
    const { id } = useParams();
    const dog = dataStore.dogsData[id];

    useEffect(() => {
      if (id) {
        if (id >= 0 && id < dataStore.dogsData.length) {
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
          <Button type="submit" title={id ? "Update" : "Save"} name="add" />
          {error}
        </form>
      </div>
    );
  })
);
