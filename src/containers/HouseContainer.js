import {useState, useEffect} from "react";
import HouseList from "../components/HouseList";

const HouseContainer = () => {
  const [allHousesState, setAllHouses] = useState([]);

  const getHouses = () => {
    return fetch('https://www.anapioficeandfire.com/api/houses')
    .then((result) => result.json())
    .then(houses => setAllHouses(houses))
  };

  useEffect(() => {
    getHouses();
  }, []);

  return (
    <div>
      <h2>House Container</h2>
      <HouseList allHouses={allHousesState}/>
    </div>
  )
}

export default HouseContainer;