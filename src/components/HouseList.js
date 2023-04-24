import React from "react";
import HouseListItem from "./HouseListItem";

// imports filteredHouses and onHouseClick, taken from setFilteredHouse and handleHouseClick respectively
const HouseList = ({filteredHouses, onHouseClick}) => {
  // creates houseItems, to be rendered in the JSX return, which is equal to filteredHouses.map(), taking the house parameter as the individual array item to iterate through. NOTE that index hasn't been put in, like it can be in a map function, because the house.url, used later, will already be unique.
  const houseItems = filteredHouses.map((house) => {
    // Used to pass down to HouseListItem
    return <HouseListItem 
      // key already has something that will work in the sense that each house url will be unique
        key={house.url}
        // houseFirstPass named for reasons at the time, perhaps just to differentiate all the house objects being passed down.
        houseFirstPass={house}
        // onClick being passed down with onHouseClick from the state in container, using the house parameter makes VSCode recognise it as a function, not sure if that really matters but what does matter is it will need a parameter/argument so do this regardless
        onClick={() => onHouseClick(house)}
      />
  })

  return (
    <div>
      <h3>House List</h3>
      {/* unordered list created */}
      <ul>
      {/* houseItems being displayed, the pass down happening within the houseItems const declared above */}
      {houseItems}
      </ul>
    </div>
  )
}

export default HouseList;