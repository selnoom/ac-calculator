import React from 'react';
import PartBox from './PartBoxes/PartBox';
import MainStatsDisplay from './MainStatsDisplay/MainStatsDisplay';
import Container from './Container';
import { useEffect, useRef, useState } from 'react';
import { saveBuildToFile, loadBuildFromFile, generateBuildLink, parseBuildFromURL } from '../Utilities/BuildSavingLoading';

function HomePage({ selectedPartsArray, setSelectedPartsArray  }) {
    const fileInputRef = useRef();
    const [toast, setToast] = useState({ show: false, message: '' });

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000); // Hide after 3 seconds
    };

    // Check if build data is present in URL when component mounts
    useEffect(() => {
        const buildFromURL = parseBuildFromURL();
        if (buildFromURL) {
            setSelectedPartsArray(buildFromURL);
        }
    }, [setSelectedPartsArray]);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        loadBuildFromFile(file, setSelectedPartsArray);
        showToast("Build loaded!");
    };

    const handleSaveBuildToFile = () => {
        saveBuildToFile(selectedPartsArray);
        showToast("Build file downloaded!");
    };

    const handleSaveBuildToLink = () => {
        const buildLink = generateBuildLink(selectedPartsArray);
        navigator.clipboard.writeText(buildLink).then(() => {
            showToast("Build link copied to clipboard!");
        });
    };

    return (
        // Utilizing the Container for horizontal centering
        <Container>
            {toast.show && (
                <div className="fixed bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg">
                    {toast.message}
                </div>
            )}
            <div className="flex mt-10 max-w-[1152px]" style={{ height: 'calc(100vh - 2rem)' }}> 
                {/* Left Section: Part Boxes Grouped */}
                <div className="flex flex-col w-full sm:w-full md:w-1/2 lg:w-2/3 xl:w-2/3 pr-1 space-y-1 overflow-y-auto">
                    <div className="mt-4 mb-2 p-2 bg-gray-700">
                    <button onClick={() => handleSaveBuildToFile()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2">
                        Save Build File
                    </button>
                    <button onClick={() => handleSaveBuildToLink()} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 ml-2">
                        Save Build Link
                    </button>
                    <button onClick={() => fileInputRef.current.click()} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-2">
                        Load Build File
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleFileSelect}
                    />
                    </div>
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