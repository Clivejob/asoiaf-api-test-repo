import React from "react";
// takes the houseFirstPass and the onClick, these have been passed all the way down from container
const HouseListItem = ({houseFirstPass, onClick}) => {

  return (
    // a div has been used for this onClick, not entirely sure if this is necessary
    <div onClick={onClick}>
    {/* Puts in the individual house object, accessing its name attribute */}
      <h4>{houseFirstPass.name}</h4>
    </div>
  )
}

export default HouseListItem;