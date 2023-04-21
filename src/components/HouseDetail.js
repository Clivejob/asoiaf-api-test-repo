import { useState, useEffect } from "react";

const HouseDetail = ({ selectedHouse, currentLord, heir, overlord, onOverlordClick }) => {
  const [houseState, setHouse] = useState(null);

  useEffect(() => {
    const fetchHouse = () => {
      fetch(selectedHouse)
        .then((res) => res.json())
        .then((houseResult) => {
          setHouse(houseResult);
        })
        .catch((error) => console.error(error));
    };
    fetchHouse();
  }, [selectedHouse]);

  return (
    <div>
      <h2>House Detail</h2>
      {houseState ? (
        <div>
          <h3>{houseState.name ? houseState.name : "N/A"}</h3>
          <p>Region: {houseState.region ? houseState.region : "N/A"}</p>
          <p>Coat of Arms: {houseState.coatOfArms ? houseState.coatOfArms : "N/A"}</p>
          <p>Words: {houseState.words ? houseState.words : "N/A"}</p>
          <p>Current Lord: {currentLord ? currentLord : "N/A"}</p>
          <p>Heir: {heir ? heir : "N/A"}</p>
          <p>Overlord:{" "} {overlord ? (<div onClick={() => onOverlordClick(houseState.overlord)}>{overlord}</div>) : ("N/A")}</p>
          <p>Ancestral Weaponry: {houseState.ancestralWeapons == "" ? "N/A" : houseState.ancestralWeapons.join(', ')}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HouseDetail