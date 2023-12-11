import React, { useContext, useMemo } from 'react';
import PartsContext from "../../Contexts/PartsContext";
import { calculateTotalLoad, findLegsPart, checkTotalLoadOverload, calculateTotalEN, findGeneratorPart, checkTotalENOverload, findArmsPart, checkArmsLoadOverload, checkArmsCapabilityOverload } from '../../Utilities/overLoadCalculations';

function PartList({ parts, filterText, onPartClick, clickedPart, boxIndex, selectorIndex }) {
  const { selectedPartsArray } = useContext(PartsContext);
  const currentSlotIndex = boxIndex * 4 + selectorIndex;
  
  const isPartAlreadySelectedOnSide = (part, boxIndex, selectorIndex, selectedPartsArray) => {
    if (boxIndex === 0) {
      // Right arm (index 0) blocks right shoulder (index 2) and vice versa
      if ((selectorIndex === 0 && selectedPartsArray[2]?.PartName === part.PartName) ||
          (selectorIndex === 2 && selectedPartsArray[0]?.PartName === part.PartName)) {
        return true;
      }
      // Left arm (index 1) blocks left shoulder (index 3) and vice versa
      if ((selectorIndex === 1 && selectedPartsArray[3]?.PartName === part.PartName) ||
          (selectorIndex === 3 && selectedPartsArray[1]?.PartName === part.PartName)) {
        return true;
      }
    }
    return false;
  };

  // Weight Load Calculations
  const legsPart = findLegsPart(selectedPartsArray);
  const maxLoadLimit = legsPart ? legsPart.LoadLimit : 0;
  const totalLoad = useMemo(() => calculateTotalLoad(selectedPartsArray, currentSlotIndex), [selectedPartsArray, currentSlotIndex]);

  // EN Load Calculations
  const generatorPart = findGeneratorPart(selectedPartsArray);
  const maxENLoadLimit = generatorPart ? generatorPart.ENOutput : 0;
  const totalENLoad = useMemo(() => calculateTotalEN(selectedPartsArray, currentSlotIndex), [selectedPartsArray, currentSlotIndex]);

  // Arms Load Calculations
  const armsPart = findArmsPart(selectedPartsArray);
  const currentArmSlotIndex = boxIndex * 4 + selectorIndex;

  return (
    <ul>
      {parts.filter(part => 
        part.PartName.toLowerCase().includes(filterText.toLowerCase()) || 
        (part.PartClass?.toLowerCase().includes(filterText.toLowerCase()))
      ).map((part, index) => {
        const isWeightOverloaded = checkTotalLoadOverload(part, totalLoad, maxLoadLimit, selectedPartsArray);
        const isENOverloaded = checkTotalENOverload(part, totalENLoad, maxENLoadLimit, selectedPartsArray);
        const isArmsOverloaded = (boxIndex === 0 && (selectorIndex === 0 || selectorIndex === 1)) && 
                                 checkArmsLoadOverload(selectedPartsArray, armsPart, part, currentArmSlotIndex);
        const isArmsCapabilityOverloaded = checkArmsCapabilityOverload(part, selectedPartsArray);
        const alreadySelected = isPartAlreadySelectedOnSide(part, boxIndex, selectorIndex, selectedPartsArray);
        const isSelected = clickedPart === part;
        
        return (
          <li 
          className={`p-2 ${alreadySelected ? 'cursor-not-allowed bg-opacity-50 bg-black' : isSelected ? 'bg-cyan-900' : 'cursor-pointer hover:bg-gray-600'}`}
          key={part.PartName}
          onClick={(event) => alreadySelected ? null : onPartClick(part, event, index)}
          >
            <div className="flex flex-col items-center border border-gray-700 p-0.25 rounded">
              <div className="text-xs sm:text-sm">
                {part.PartName}{part.PartClass ? `, ${part.PartClass}` : ''}
              </div>
              <div className="text-xs sm:text-sm">
                {isWeightOverloaded && <div className="text-red-500">Weight Overload</div>}
                {isENOverloaded && <div className="text-blue-500">EN Overload</div>}
                {isArmsOverloaded && <div className="text-yellow-500">Arms Overload</div>}
                {isArmsCapabilityOverloaded && <div className="text-yellow-500">Arms Load Overload</div>}
                {alreadySelected && <div className="text-white bg-red-500 px-2 py-1">Part already selected on this side</div>}
              </div>
              <img src={process.env.PUBLIC_URL + '/' + part.imagePath} alt={part.PartName} className={`h-24 mt-2 ${alreadySelected ? 'opacity-50' : ''}`} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default PartList;
