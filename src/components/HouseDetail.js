import { useEffect } from "react";

const HouseDetail = ({
  houseData,
  currentLord,
  heir,
  overlord,
  onOverlordClick,
}) => {
  useEffect(() => {}, []);

  return (
    <div>
      <h2>House Detail</h2>
      {houseData ? (
        <div>
          <h3>{houseData.name ? houseData.name : "N/A"}</h3>
          <p>Region: {houseData.region ? houseData.region : "N/A"}</p>
          <p>
            Coat of Arms: {houseData.coatOfArms ? houseData.coatOfArms : "N/A"}
          </p>
          <p>Words: {houseData.words ? houseData.words : "N/A"}</p>
          <p>Current Lord: {currentLord ? currentLord : "N/A"}</p>
          <p>Heir: {heir ? heir : "N/A"}</p>
          <p>
            Overlord:{" "}
            {overlord ? (
              <div onClick={() => onOverlordClick(houseData.overlord)}>
                {overlord}
              </div>
            ) : (
              "N/A"
            )}
          </p>
          <p>
            Ancestral Weaponry:{" "}
            {houseData.ancestralWeapons == ""
              ? "N/A"
              : houseData.ancestralWeapons.join(", ")}
          </p>
        </div>
      ) : (
        <p>Loading - Please wait</p>
      )}
    </div>
  );
};

export default HouseDetail