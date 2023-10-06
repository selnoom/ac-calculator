import React, { useState} from 'react';
import './App.css';
import MainStatsDisplay from './Components/MainStatsDisplay/MainStatsDisplay';
import PartBox from './Components/PartBoxes/PartBox';
import PartsContext from './Contexts/PartsContext';

function App() {
  const [selectedPartsArray, setSelectedPartsArray] = useState([]);

  return (
    <PartsContext.Provider value={{ selectedPartsArray, setSelectedPartsArray }}>
      <div className="App h-screen bg-gray-900 text-white overflow-hidden">
        <div className="flex h-full overflow-hidden">
      
          {/* Left Section: Part Boxes Grouped */}
          <div className="flex flex-col w-1/2 p-4 space-y-4 overflow-y-auto h-ful">
            <PartBox title="UNIT" 
            partsInfo={[
              { type: "rightArm", placeholder: "R-Arm Unit" },
              { type: "leftArm", placeholder: "L-Arm Unit" },
              { type: "rightShoulder", placeholder: "R-Shoulder Unit" },
              { type: "leftShoulder", placeholder: "L-Shoulder Unit" }
            ]}
            boxIndex={0} />
            <PartBox title="FRAME" 
            partsInfo={[
              { type: "head", placeholder: "HEAD" },
              { type: "core", placeholder: "CORE" },
              { type: "arms", placeholder: "ARMS" },
              { type: "legs", placeholder: "LEGS" }
            ]}
            boxIndex={1} />
            <PartBox title="INNER" 
            partsInfo={[
              { type: "booster", placeholder: "BOOSTER" },
              { type: "fcs", placeholder: "FCS" },
              { type: "generator", placeholder: "GENERATOR" },
              { type: "expansion", placeholder: "EXPANSION" }
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
  );
}

export default App;
