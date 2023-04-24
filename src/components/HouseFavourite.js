import { useEffect } from "react";

const HouseFavourite = ({favouriteHouses, errorMessage}) => {

  useEffect(() => {

  }, [favouriteHouses.length])
  return ( 
    <>
    <h1>House Favs!</h1>
    {favouriteHouses.map((house, index) => (
        <h3 key={index}>{house.name}</h3>
      ))}
    <h4>You have {favouriteHouses.length} houses in your list!</h4>
    </>
   );
}
 
export default HouseFavourite;