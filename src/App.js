import React from 'react';
import './App.css';
import PartSelector from './Components/PartSelector';

function App() {
  return (
    <div className="App h-screen bg-gray-900 text-white overflow-hidden">
      <div className="flex h-full">

        {/* Left Section: Part Boxes Grouped */}
        <div className="flex flex-col w-full lg:w-1/2 p-4 space-y-4 overflow-y-auto">

          {/* Weapons */}
          <div className="weapon-box bg-gray-700 p-4 space-y-4">
            <h2 className="text-left text-xl mb-2">UNIT</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="Right Arm Unit"></PartSelector>
              </div>
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="Left Arm Unit"></PartSelector>
              </div>
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="Right Shoulder Unit"></PartSelector>
              </div>
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="Left Shoulder Unit"></PartSelector>
              </div>
            </div>
          </div>

          {/* Frame */}
          <div className="frame-box bg-gray-700 p-4 space-y-4">
            <h2 className="text-left text-xl mb-2">FRAME</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="HEAD"></PartSelector>
              </div>
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="CORE"></PartSelector>
              </div>
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="ARMS"></PartSelector>
              </div>
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="LEGS"></PartSelector>
              </div>
            </div>
          </div>

          {/* Inner Parts & Expansion */}
          <div className="inner-expansion-box bg-gray-700 p-4 space-y-4">
            <h2 className="text-left text-xl mb-2">INNER</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="BOOSTER"></PartSelector>
              </div>
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="FCS"></PartSelector>
              </div>
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="GENERATOR"></PartSelector>
              </div>
              <div className="part-box bg-gray-800 p-4">
                <PartSelector placeholder="EXPANSION"></PartSelector>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Section: Overall Stats Display */}
        <div className="hidden lg:block w-1/2 p-4 bg-gray-700">
          {/* Placeholder for stats display */}
          Overall Stats Display
        </div>

      </div>
    </div>
  );
}

export default App;
