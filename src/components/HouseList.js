import React from "react";
import HouseListItem from "./HouseListItem";

const HouseList = ({allHouses, onHouseClick}) => {

  const houseItems = allHouses.map((house) => {
    return <HouseListItem 
        key={house.url}
        houseFirstPass={house}
        onClick={() => onHouseClick(house)}
      />
  })

  return (
    <div>
      <h3>House List</h3>
      <ul>
      {houseItems}
      </ul>
    </div>
  )
}

export default HouseList;