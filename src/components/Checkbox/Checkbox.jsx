import { useState } from "react";

export function Checkbox(props) {
    const [check, setCheck] = useState([]);
    const data = props.data;


    function handleSubmit(e) {
        e.preventDefault();
       
        props.onSubmit(check);
    }

    function updateString(inputValue) {
        setCheck((state) => ([...state, inputValue]));
    }
    
    function inserIntoArray(inputValue) {
        setCheck((state) => ([...state, inputValue]));
    }

    function removeFromArray(inputValue) {
        setCheck((state) => state.filter((value) => value !== inputValue));
    }

    function handleChecked(e) {
        const inputValue = e.target.value;

        if(Array.isArray(check)) {
            if(e.target.checked){
                inserIntoArray(inputValue);
            } else {
                removeFromArray(inputValue);
            }
        } else {
            updateString(e.target.checked ? inputValue : "");
        }

    };

     
    var checkbox = data.map((option) => (

        <div key={option.id}>
            <label>{option.name}</label>
            <input name={option.name} value={option.name} type="checkbox" onChange={handleChecked}/>
        </div>
     )
    )
   
    return <form onSubmit={handleSubmit}>
              {checkbox}
              <button type="submit">Add</button>
           </form>
}