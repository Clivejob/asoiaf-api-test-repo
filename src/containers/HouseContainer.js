import { useState, useEffect } from "react";
import HouseList from "../components/HouseList";
import HouseDetail from "../components/HouseDetail";

const HouseContainer = () => {
  // SetAllHouses used for the initial fetch, allHousesState used for the overlordClick and for filtering the houses
  const [allHousesState, setAllHouses] = useState([]);
  // Mostly used in passing down for HouseDetails, setSelectedHouse used for getting the HouseUrl unique identifier
  const [selectedHouseState, setSelectedHouse] = useState(null);
  // filteredHouseState passed down to HouseList as AllHouses, setFilteredHouse used in the filterHouses const as the final action
  const [filteredHouseState, setFilteredHouse] = useState([]);
  // currentLordState is passed down to the HouseDetail component, setCurrentLord used within a truthy if statement in the handleHouseClick function
  const [currentLordState, setCurrentLord] = useState(null);
  // heirState is passed down to the HouseDetail component, setHeir is used within a truthy if statement in the handleHouseClick function
  const [heirState, setHeir] = useState(null);
  // overlordState is passed down to the HouseDetail component, setOverlord is used within a truthy if statement in the handleHouseClick function
  const [overlordState, setOverlord] = useState(null);
  // selectedHouseData is passed down to the HouseDetail component, setSelectedHouseData is used within handleHouseClick function
  const [selectedHouseData, setSelectedHouseData] = useState(null);

  // function created as const getHouses, no parameters
  const getHouses = () => {
    // let used to create pageNumber set to 1, let used in order to allow this number to change, pageNumber to be used within URL later
    let pageNumber = 1;
    // creates an empty array through which the results can be stored
    const allHouses = [];
    // function fetchHouses created as const fetchHouses, no parameters
    const fetchHouses = () => {
      // fetch request, made using pagenumber passed in through backticks, max pageSize is equal to 50, needed to be done to get all the houses
      fetch(`https://www.anapioficeandfire.com/api/houses?page=${pageNumber}&pageSize=50`)
        // parses the results of this fetch into json
        .then((res) => res.json())
        // takes the json results into a function as the parameter of the function
        .then((houseResults) => {
          // consolelog un-necessary, but was used to confirm the reading of the array length
          console.log(houseResults.length);
          // takes the empty array allHouses and pushes the json results, represented by houseResults, into it. spread operator is used in order to ensure all results kept
          allHouses.push(...houseResults);
          // logic conditional testing the length of the array, if equal to 50...
          if (houseResults.length === 50) {
            // pageNumber is increased by one
            pageNumber++;
            // fetchHouses is run again
            fetchHouses();
            // else
          } else {
            // uses setAllHouses to set the state to the allHouses array
            setAllHouses(allHouses);
          }
        })
        // If this fails, an error is provided
        .catch((error) => console.error(error));
    };
    // the first run of fetchHouses
    fetchHouses();
  };
// upon the site rendering, the useEffect runs and calls getHouses, the above function. 
  useEffect(() => {
    // runs getHouses, this is typically the 'sideeffect' part
    getHouses();
    // empty brackets used to indicate that it won't be re-run
  }, []);

  // function created as handleHouseClick const, the house parameter being passed in being based on the input from the event listener
  const handleHouseClick = (house) => {
    // setSelectedHouse is set to the url property of the house object passed in
    setSelectedHouse(house.url);

    // standard fetch requests
    // Fetch selected house
    fetch(house.url)
      .then((res) => res.json())
      .then((houseResult) => {
        setSelectedHouseData(houseResult);
      })
      .catch((error) => console.error(error));

    // standard fetch requests within an if
    // Fetch current lord
    if (house.currentLord) {
      fetch(house.currentLord)
        .then((res) => res.json())
        // uses the setCurrentLord useState and applies the name attribute of the lordData
        .then((lordData) => setCurrentLord(lordData.name))
        .catch((error) => console.error(error));
    } else {
      setCurrentLord(null);
    }

    // standard fetch requests within an if
    // Fetch heir
    if (house.heir) {
      fetch(house.heir)
        .then((res) => res.json())
        .then((heirData) => setHeir(heirData.name))
        .catch((error) => console.error(error));
    } else {
      setHeir(null);
    }

    // standard fetch requests within an if
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

  // creates a function with the parameter of overlordURL
  const handleOverlordClick = (overlordURL) => {
    // new const created, overlordHouse, which is equal to the find HOF passed to allHousesState. It takes the house parameter and checks if it is equal to overlordURL 
    const overlordHouse = allHousesState.find(house => house.url === overlordURL);
    // truthy if statement, ie if overlordHouse has found a url...
    if (overlordHouse) {
      // handleHouseClick is then set to overlordHouse, which is itself equal to the overlordURL
      handleHouseClick(overlordHouse);
    }
  };

  // creates a function, filterHouses, which takes region as a parameter
  const filterHouses = (region) => {
    // creates an object which contains the various regions in a key/value pairing
    const housesByRegion = {
      "The North": [],
      "The Riverlands": [],
      "The Vale": [],
      "Iron Islands": [],
      "The Westerlands": [],
      "The Crownlands": [],
      "The Stormlands": [],
      "The Reach": [],
      "Dorne": [],
    };
    // checks allHousesState using a forEach HOF, iterating through each house
    allHousesState.forEach((house) => {
      // evaluates whether the 'region' attribute of each house is equal to the region specified
      if (house.region === region) {
// accesses the object housesByRegion and takes the string value of the name as a key, if accepted pushes the house into said region
housesByRegion[region].push(house);
}
});
// updates the filtered houses by letting setFilteredHouse equal to housesByRegion[region]
setFilteredHouse(housesByRegion[region]);
};

return (
<div>
<h2>House Container</h2>
{/* Buttons with onClick functionality, uses filterHouses function for each click, passing the region string in as the argument's value/argument */}
<button onClick={() => filterHouses("The North")}>Filter by the North</button>
<button onClick={() => filterHouses("The Riverlands")}>Filter by the Riverlands</button>
<button onClick={() => filterHouses("The Vale")}>Filter by the Vale</button>
<button onClick={() => filterHouses("Iron Islands")}>Filter by the Iron Islands</button>
<button onClick={() => filterHouses("The Westerlands")}>Filter by the Westerlands</button>
<button onClick={() => filterHouses("The Crownlands")}>Filter by the Crownlands</button>
<button onClick={() => filterHouses("The Stormlands")}>Filter by the Stormlands</button>
<button onClick={() => filterHouses("The Reach")}>Filter by the Reach</button>
<button onClick={() => filterHouses("Dorne")}>Filter by Dorne</button>
{/* passes down filteredHouseState and handleHouseClick to HouseList */}
<HouseList allHouses={filteredHouseState} onHouseClick={handleHouseClick} />
{/* if truthy, takes selectedHouseState and provides it to HouseDetail, along with various states and functions, ternery */}
{selectedHouseState ? (
  <HouseDetail
    houseData={selectedHouseData}
    currentLord={currentLordState}
    heir={heirState}
    overlord={overlordState}
    onOverlordClick={handleOverlordClick}
  />
) : (
  "Please select a house"
)}
</div>
);
};

export default HouseContainer;