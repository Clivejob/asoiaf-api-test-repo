import React from "react";
import HouseListItem from "./HouseListItem";

const HouseList = ({allHouses}) => {

  const houseItems = allHouses.map((house) => {
    return <HouseListItem houseFirstPass={house}/>
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