import { useInstance, provider } from "react-ioc";
import { observer } from "mobx-react-lite";
import { useRef } from "react";
import { DataStore } from "../../Stores/DataStore";
import "./DogModal.styles.css";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export const DogModal = provider(DataStore)(
  observer(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dataStore = useInstance(DataStore);
    const nameRef = useRef(null);
    const energyLevelRef = useRef(null);
    const createDog = (e) => {
      console.log(nameRef.current.value);
      e.preventDefault();
      dataStore.createDog({
        name: nameRef.current.value,
        energyLevel: energyLevelRef.current.value,
      });
      nameRef.value = null;
      energyLevelRef.current.value = null;
    };
    return (
      <div>
        <Header />
        <form onSubmit={createDog}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            placeholder="Dog's name.."
          />
          <label htmlFor="energyLevel">Energy-level:</label>
          <input
            type="number"
            id="energyLevel"
            ref={energyLevelRef}
            placeholder="Energy level..."
          />
          <Button type="submit" title="Save" name="add" />
        </form>
      </div>
    );
  })
);
