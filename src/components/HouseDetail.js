import React from "react";

const HouseDetail = ({allHouses, selectedHouse}) => {

  const selectedHouseObj = allHouses.find((house) => house.url === selectedHouse);

  return (
    <div>
      <h4>{selectedHouseObj.name}</h4>
      <h5>{selectedHouseObj.currentLord}</h5>
      <h5>{selectedHouseObj.heir}</h5>
      <h5>{selectedHouseObj.founded}</h5>
      <h5>{selectedHouseObj.words}</h5>
      <h5>{selectedHouseObj.coatOfArms}</h5>
      <h5>{selectedHouseObj.region}</h5>
      <h5>{selectedHouseObj.overlord}</h5>
    </div>
  );
}

export default HouseDetail;