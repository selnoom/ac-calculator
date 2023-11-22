import React from 'react';
import PartBox from './PartBoxes/PartBox';
import MainStatsDisplay from './MainStatsDisplay/MainStatsDisplay';

function HomePage({ selectedPartsArray }) {
    return (
        <div className="flex flex-col overflow-hidden" style={{ height: 'calc(100vh)' }}>
            <div className="flex flex-1 overflow-hidden">
                {/* Left Section: Part Boxes Grouped */}
                <div className="flex flex-col w-1/2 pr-1 space-y-1 overflow-y-auto mt-10">
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
                <div className="w-1/2 p-4 bg-gray-700 overflow-y-auto mt-12">
                    <MainStatsDisplay selectedParts={selectedPartsArray} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;