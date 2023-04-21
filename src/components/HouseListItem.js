import React from "react";

const HouseListItem = ({houseFirstPass, onClick}) => {

  return (
    <div onClick={onClick}>
      <h4>{houseFirstPass.name}</h4>
    </div>
  )
}

export default HouseListItem;