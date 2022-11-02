import { inject } from "react-ioc";
import { makeAutoObservable, runInAction } from "mobx";
import { DogsService } from "../../Common/DogsService";

export class DataStore {
  dogsService = inject(this, DogsService);
  dogsData = [];
  filterData = [];
  filterQuery = "";

  constructor() {
    makeAutoObservable(this);
    this.getDogs();
    console.log("CREATED: data store");
  }

  getDogs = async () => {
    try {
      const data = await this.dogsService.get("allDogs");
      runInAction(() => {
        this.dogsData = Object.values(data);
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };

  getFilteredDogs = async () => {
    try {
      var params = {
        filterQuery: this.filterQuery,
      };
      const data = await this.dogsService.get(
        "groupOfDogs/" + params.filterQuery
      );
      runInAction(() => {
        this.filterData = Object.values(data);
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };

  createDog = async (model) => {
    try {
      const response = await this.dogsService.put(
        model,
        "allDogs/" + this.dogsData.length
      );
      if (response.status === 201) {
        runInAction(() => {
          this.status = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };

  updateDog = async (dog) => {
    try {
      const response = await this.dogsService.update(dog, "allDogs/" + this.id);
      if (response.status === 200) {
        runInAction(() => {
          this.status = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
}
