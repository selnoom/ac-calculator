import React, {useContext} from 'react';
import PartSelector from '../PartSelector/PartSelector';
import PartsContext from '../../Contexts/PartsContext';

function PartBox({ title, partsInfo, boxIndex }) {
  const { selectedPartsArray, setSelectedPartsArray } = useContext(PartsContext);

  const isAnyPartSelected = partsInfo.some((_, selectorIndex) => {
    const globalIndex = boxIndex * partsInfo.length + selectorIndex;
    return selectedPartsArray[globalIndex] !== null;
  });

  const handlePartSelect = (part, selectorIndex) => {
    // Determine the global index for the selected part
    const globalIndex = boxIndex * partsInfo.length + selectorIndex;

    // Create a new array based on the current selectedPartsArray
    const updatedParts = [...selectedPartsArray];
    updatedParts[globalIndex] = part;

    // If the selected part is a tank tread leg, remove the booster
    if (part && part.LegType === "Tank") {
      updatedParts[8] = null; // 8 is the boosters position
    }

    setSelectedPartsArray(updatedParts);
  }

  const clearAllPartsInBox = () => {
    const updatedParts = [...selectedPartsArray];
    partsInfo.forEach((_, selectorIndex) => {
      const globalIndex = boxIndex * partsInfo.length + selectorIndex;
      updatedParts[globalIndex] = null;
    });
    setSelectedPartsArray(updatedParts);
  }

  return (
    <div className="part-box-group bg-gray-700 p-4 space-y-4 relative">
      <div className="flex justify-between items-center">
        <h2 className="text-left text-xl mb-2">{title}</h2>
        {isAnyPartSelected && (
          <div 
            onClick={clearAllPartsInBox} 
            className="text-white bg-red-600 rounded-full h-6 w-6 flex items-center justify-center cursor-pointer"
            title="Clear All Parts">
            X
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {partsInfo.map((info, selectorIndex) => (
          <div key={selectorIndex} className="part-box bg-gray-800 p-1 h-40 flex items-center justify-center">
            <PartSelector 
              placeholder={info.placeholder} 
              onPartSelected={part => handlePartSelect(part, selectorIndex)}
              partType={info.type}
              boxIndex={boxIndex}
              selectorIndex={selectorIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartBox;
