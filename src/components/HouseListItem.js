import React from "react";

const HouseListItem = ({houseFirstPass}) => {

  return (
    <div>
      <h4>{houseFirstPass.name}</h4>
      <h5>{houseFirstPass.region}</h5>
      <h6>{houseFirstPass.overlord}</h6>
    </div>
  )
}

export default HouseListItem;