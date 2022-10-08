import { useState } from "react";

export function FormElementSelect(props) {
    const [ sortDogs, setSortDogs ] = useState("descending");

    function handleSubmit(e) {
        e.preventDefault();

        props.onSubmit(sortDogs);  
    }

    function handleChange (e) {
       setSortDogs(e.target.value);
    }


return <form onSubmit={handleSubmit}>
          <select value={sortDogs} onChange={handleChange}>
            <option value="descending">Descending(A-Z)</option>
            <option value="ascending">Ascending(Z-A)</option>
          </select>
          <button type="submit">Add</button>
       </form>
}