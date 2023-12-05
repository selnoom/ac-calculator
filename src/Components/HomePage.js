import React from 'react';
import PartBox from './PartBoxes/PartBox';
import MainStatsDisplay from './MainStatsDisplay/MainStatsDisplay';
import Container from './Container';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function HomePage({ selectedPartsArray, setSelectedPartsArray  }) {
    const location = useLocation();
    
    useEffect(() => {
        if (location.pathname === '/') {
          setSelectedPartsArray(Array(12).fill(null));
        }
    }, [location, setSelectedPartsArray]);

    return (
        // Utilizing the Container for horizontal centering
        <Container>
            <div className="flex mt-10 max-w-[1152px]" style={{ height: 'calc(100vh - 2rem)' }}> 
                {/* Left Section: Part Boxes Grouped */}
                <div className="flex flex-col w-full sm:w-full md:w-1/2 lg:w-2/3 xl:w-2/3 pr-1 space-y-1 overflow-y-auto">
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
                <div className="w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/3 p-4 bg-gray-700 text-sm sm:text-base overflow-y-auto">
                    <MainStatsDisplay selectedParts={selectedPartsArray} />
                </div>
            </div>
        </Container>
    );
}

export default HomePage;