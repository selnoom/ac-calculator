import React, {useContext} from 'react';
import PartSelector from '../PartSelector/PartSelector';
import PartsContext from '../../Contexts/PartsContext';

function PartBox({ title, partsInfo, boxIndex }) {
  const { selectedPartsArray, setSelectedPartsArray } = useContext(PartsContext);

  const handlePartSelect = (part, selectorIndex) => {
    // Determine the global index for the selected part
    const globalIndex = boxIndex * partsInfo.length + selectorIndex;

    // Create a new array based on the current selectedPartsArray
    const updatedParts = [...selectedPartsArray];
    updatedParts[globalIndex] = part;

    // If the selected part is a tank tread leg, remove the booster
    if (part && part.LegType === "Tank") {
      const boosterIndex = boxIndex * partsInfo.length + partsInfo.findIndex(info => info.type === "booster");
      updatedParts[boosterIndex] = null; // or {} based on what an empty part looks like
    }

    setSelectedPartsArray(updatedParts);
  }

  return (
    <div className="part-box-group bg-gray-700 p-4 space-y-4">
      <h2 className="text-left text-xl mb-2">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {partsInfo.map((info, selectorIndex) => (
          <div key={selectorIndex} className="part-box bg-gray-800 p-4">
            <PartSelector 
              placeholder={info.placeholder} 
              onPartSelected={part => handlePartSelect(part, selectorIndex)}
              partType={info.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartBox;
