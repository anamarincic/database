import { Button } from "../components/Button";
import { useEffect, useState } from "react";

export default function AddNewDog() {
  const [data, setData] = useState([]);
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
  const newId = data.length;

  const Newdata = {
    [newId]: { energyLevel: 10, name: "Ivica", group: "herding", id: newId },
  };

  const handleClick = () => {
    Promise.all([
      fetch(
        `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/allDogs/${Newdata[newId].id}.json`,
        {
          method: `PUT`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: Newdata[newId].name,
            energyLevel: Newdata[newId].energyLevel,
            id: Newdata[newId].id,
          }),
        }
      ),
      fetch(
        `https://dog-related-application-default-rtdb.europe-west1.firebasedatabase.app/dogs/groupOfDogs/${Newdata[newId].group}/${Newdata[newId].id}.json`,
        {
          method: `PUT`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Newdata[newId].name),
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
  };
  return (
    <div>
      <Button onClick={handleClick} />
    </div>
  );
}
