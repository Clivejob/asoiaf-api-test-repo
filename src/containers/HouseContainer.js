import { useState, useEffect } from "react";
import HouseList from "../components/HouseList";
import HouseDetail from "../components/HouseDetail";

const HouseContainer = () => {
  const [allHousesState, setAllHouses] = useState([]);
  const [selectedHouseState, setSelectedHouse] = useState(null);
  const [filteredHouseState, setFilteredHouse] = useState([]);
  const [currentLordState, setCurrentLord] = useState(null);
  const [heirState, setHeir] = useState(null);
  const [overlordState, setOverlord] = useState(null);
  const [selectedHouseData, setSelectedHouseData] = useState(null);

  const getHouses = () => {
    let pageNumber = 1;
    const allHouses = [];
    const fetchHouses = () => {
      fetch(`https://www.anapioficeandfire.com/api/houses?page=${pageNumber}&pageSize=50`)
        .then((res) => res.json())
        .then((houseResults) => {
          console.log(houseResults.length);
          allHouses.push(...houseResults);
          if (houseResults.length === 50) {
            pageNumber++;
            fetchHouses();
          } else {
            setAllHouses(allHouses);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchHouses();
  };

  useEffect(() => {
    getHouses();
  }, []);

  const handleHouseClick = (house) => {
    setSelectedHouse(house.url);

    // Fetch selected house
    fetch(house.url)
      .then((res) => res.json())
      .then((houseResult) => {
        setSelectedHouseData(houseResult);
      })
      .catch((error) => console.error(error));

    // Fetch current lord
    if (house.currentLord) {
      fetch(house.currentLord)
        .then((res) => res.json())
        .then((lordData) => setCurrentLord(lordData.name))
        .catch((error) => console.error(error));
    } else {
      setCurrentLord(null);
    }

    // Fetch heir
    if (house.heir) {
      fetch(house.heir)
        .then((res) => res.json())
        .then((heirData) => setHeir(heirData.name))
        .catch((error) => console.error(error));
    } else {
      setHeir(null);
    }

    // Fetch overlord
    if (house.overlord) {
      fetch(house.overlord)
        .then((res) => res.json())
        .then((overlordData) => setOverlord(overlordData.name))
        .catch((error) => console.error(error));
    } else {
      setOverlord(null);
    }
  };

  const handleOverlordClick = (overlordURL) => {
    const overlordHouse = allHousesState.find(house => house.url === overlordURL);
    if (overlordHouse) {
      handleHouseClick(overlordHouse);
    }
  };

  const filterHouses = (region) => {
    const housesByRegion = {
      "The North": [],
      "The Riverlands": [],
      "The Vale": [],
      "Iron Islands": [],
      "The Westerlands": [],
      "The Crownlands": [],
      "The Stormlands": [],
      "The Reach": [],
      Dorne: [],
    };

    allHousesState.forEach((house) => {
      if (house.region === region) {
housesByRegion[region].push(house);
}
});

setFilteredHouse(housesByRegion[region]);
};

return (
<div>
<h2>House Container</h2>
<button onClick={() => filterHouses("The North")}>Filter by the North</button>
<button onClick={() => filterHouses("The Riverlands")}>Filter by the Riverlands</button>
<button onClick={() => filterHouses("The Vale")}>Filter by the Vale</button>
<button onClick={() => filterHouses("Iron Islands")}>Filter by the Iron Islands</button>
<button onClick={() => filterHouses("The Westerlands")}>Filter by the Westerlands</button>
<button onClick={() => filterHouses("The Crownlands")}>Filter by the Crownlands</button>
<button onClick={() => filterHouses("The Stormlands")}>Filter by the Stormlands</button>
<button onClick={() => filterHouses("The Reach")}>Filter by the Reach</button>
<button onClick={() => filterHouses("Dorne")}>Filter by Dorne</button>
<HouseList allHouses={filteredHouseState} onHouseClick={handleHouseClick} />
{selectedHouseState && (
  <HouseDetail
    houseData={selectedHouseData}
    currentLord={currentLordState}
    heir={heirState}
    overlord={overlordState}
    onOverlordClick={handleOverlordClick}
  />
)}
</div>
);
};

export default HouseContainer;