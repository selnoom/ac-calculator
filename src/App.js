import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import MainStatsDisplay from './Components/MainStatsDisplay/MainStatsDisplay';
import PartBox from './Components/PartBoxes/PartBox';
import PartsContext from './Contexts/PartsContext';
import Header from './Components/Header/header';

function App() {
  const [selectedPartsArray, setSelectedPartsArray] = useState(Array(12).fill(null));

  return (
    <Router>
      <PartsContext.Provider value={{ selectedPartsArray, setSelectedPartsArray }}>
        <div className="App h-screen bg-gray-900 text-white overflow-hidden">
          <div className="flex h-full overflow-hidden">
          <Header />
          <Routes>
            <Route path="/" exact component={<App></App>} />
            {/* <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/calculations" component={CalculationInfoPage} /> */}
            {/* Add more routes as needed */}
          </Routes>
            {/* Left Section: Part Boxes Grouped */}
            <div className="flex flex-col w-1/2 p-4 space-y-4 overflow-y-auto h-full">
              <PartBox title="WEAPONS"
              partsInfo={[
                { type: "rightArm", placeholder: "R-Arm Unit" },
                { type: "leftArm", placeholder: "L-Arm Unit" },
                { type: "rightShoulder", placeholder: "R-Shoulder Unit" },
                { type: "leftShoulder", placeholder: "L-Shoulder Unit" }
              ]}
              boxIndex={0} />
              <PartBox title="BODY"
              partsInfo={[
                { type: "head", placeholder: "Head" },
                { type: "core", placeholder: "Core" },
                { type: "arms", placeholder: "Arms" },
                { type: "legs", placeholder: "Legs" }
              ]}
              boxIndex={1} />
              <PartBox title="INNER PARTS"
              partsInfo={[
                { type: "booster", placeholder: "Booster" },
                { type: "fcs", placeholder: "FCS" },
                { type: "generator", placeholder: "Generator" },
                { type: "expansion", placeholder: "Expansion" }
              ]}
              boxIndex={2} />
            </div>
            {/* Right Section: Overall Stats Display */}
            <div className="w-1/2 p-4 bg-gray-700 overflow-y-auto h-full">
              <MainStatsDisplay selectedParts={selectedPartsArray} />
            </div>
          </div>
        </div>
      </PartsContext.Provider>
    </Router>
  );
}

export default App;
