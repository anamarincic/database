import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import "./AddNewDog.styles.css";

const initialState = {
  name: "",
  energyLevel: "",
  group: "",
};

export function AddNewDog() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [state, setState] = useState(initialState);

  const { name, energyLevel, group } = state;

  const navigate = useNavigate();
  const { id } = useParams();

  ///Get all data
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/allDogs.json"
      );
      return await response.json();
    })()
      .then((data) => {
        //data object into array
        setData(Object.values(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const newId = data.length;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !energyLevel) {
      setError("Please provide value in each input field");
    } else {
      if (!id) {
        const Newdata = {
          [newId]: { state, id: newId },
        };
        Promise.all([
          fetch(
            `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/allDogs/${newId}.json`,
            {
              method: `PUT`,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: Newdata[newId].state.name,
                energyLevel: Newdata[newId].state.energyLevel,
                id: Newdata[newId].id,
              }),
            }
          ),
          fetch(
            `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/groupOfDogs/${Newdata[
              newId
            ].state.group.toLowerCase()}/${newId}.json`,
            {
              method: `PUT`,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(Newdata[newId].state.name),
            }
          ),
        ])
          .then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(
              responses.map(function (response) {
                return response.json();
              })
            );
          })
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        alert("Dog added successfully");
      } else {
        fetch(
          `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/allDogs/${id}.json`,
          {
            method: `PATCH`,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: state.name,
              energyLevel: state.energyLevel,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        alert("Dog updated successfully");
      }
      setTimeout(() => navigate("/"), 500);
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
          value={name || ""}
          onChange={handleInputChange}
          placeholder="Dog's name.."
        />
        {!id && <label htmlFor="group">Group:</label>}
        {!id && (
          <input
            type="text"
            id="group"
            name="group"
            value={group || ""}
            onChange={handleInputChange}
            autoCapitalize="none"
            placeholder="Which group dog belongs.."
          />
        )}
        <label htmlFor="energyLevel">Energy-level:</label>
        <input
          type="number"
          id="energyLevel"
          name="energyLevel"
          value={energyLevel || ""}
          onChange={handleInputChange}
          placeholder="Energy level..."
        />
        <Button type="submit" title={id ? "Update" : "Save"} name="add" />
        {error}
      </form>
    </div>
  );
}
