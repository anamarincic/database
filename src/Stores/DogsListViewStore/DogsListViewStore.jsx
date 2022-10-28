import { inject } from "react-ioc";
import { makeAutoObservable } from "mobx";
import { DataStore } from "../DataStore";

export class DogsListViewStore {
  dataStore = inject(this, DataStore);

  constructor() {
    makeAutoObservable(this);
    console.log("CREATED: dogs list view store");
  }

  get dogs() {
    return this.dataStore.dogsData.map((dog) => ({
      id: dog.id,
      name: dog.name,
      energyLevel: dog.energyLevel,
    }));
  }
}
