import { useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import { Select } from "../Select";

export function Form(props) {
  const [formState, setFormState] = useState({
    sortBy: "",
    filters: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(formState);
  };

  function updateString(inputValue) {
    setFormState((state) => ({
      ...state,
      filters: [...state.filters, inputValue],
    }));
  }

  function inserIntoArray(inputValue) {
    setFormState((state) => ({
      ...state,
      filters: [...state.filters, inputValue],
    }));
  }

  function removeFromArray(inputValue) {
    setFormState((state) => ({
      filters: state.filters.filter((value) => value !== inputValue),
    }));
  }

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.type === "checkbox") {
      if (Array.isArray(formState.filters)) {
        if (e.target.checked) {
          inserIntoArray(value);
        } else {
          removeFromArray(value);
        }
      } else {
        updateString(e.target.checked ? value : "");
      }
    } else {
      setFormState((state) => ({
        ...state,
        [e.target.name]: value,
      }));
    }
  };
  //console.log(formState);
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Select
          label="sort by:"
          name="sortBy"
          onChange={handleChange}
          value={formState.sortBy}
          options={[
            { value: "descending", label: "A-Z" },
            { value: "ascending", label: "Z-A" },
          ]}
        />
      </div>
      <div>
        <Checkbox
          label="Filter"
          name="filter"
          dataNameFilter={props.dataName}
          onChange={handleChange}
        />
      </div>
      <button>Add</button>
    </form>
  );
}
