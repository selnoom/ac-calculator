import React from 'react';
import PartBox from './PartBoxes/PartBox';
import MainStatsDisplay from './MainStatsDisplay/MainStatsDisplay';
import Container from './Container';

function HomePage({ selectedPartsArray }) {
    return (
        // Utilizing the Container for horizontal centering
        <Container>
            {/* Flex container for the two main sections */}
            <div className="flex mt-10" style={{ height: 'calc(100vh - 2rem)' }}> 
                {/* Left Section: Part Boxes Grouped */}
                <div className="flex flex-col w-1/2 pr-1 space-y-1 overflow-y-auto">  {/* Overflow for individual scrolling */}
                    {/* Part boxes for weapons */}
                    <PartBox title="WEAPONS"
                        partsInfo={[
                            { type: "rightArm", placeholder: "R-Arm Unit" },
                            { type: "leftArm", placeholder: "L-Arm Unit" },
                            { type: "rightShoulder", placeholder: "R-Shoulder Unit" },
                            { type: "leftShoulder", placeholder: "L-Shoulder Unit" }
                        ]}
                        boxIndex={0} />
                    {/* Part boxes for body parts */}
                    <PartBox title="BODY"
                        partsInfo={[
                            { type: "head", placeholder: "Head" },
                            { type: "core", placeholder: "Core" },
                            { type: "arms", placeholder: "Arms" },
                            { type: "legs", placeholder: "Legs" }
                        ]}
                        boxIndex={1} />
                    {/* Part boxes for inner parts */}
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
                {/* Overflow for individual scrolling */}
                <div className="w-1/2 p-4 bg-gray-700 overflow-y-auto">
                    <MainStatsDisplay selectedParts={selectedPartsArray} />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;