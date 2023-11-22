import React, { useContext, useMemo } from 'react';
import PartsContext from "../../Contexts/PartsContext";
import { calculateTotalLoad, findLegsPart, checkTotalLoadOverload, calculateTotalEN, findGeneratorPart, checkTotalENOverload } from '../../Utilities/overLoadCalculations';

function PartList({ parts, filterText, onPartClick, clickedPart, boxIndex, selectorIndex }) {
  const { selectedPartsArray } = useContext(PartsContext);
  const currentSlotIndex = boxIndex * 4 + selectorIndex;

  // Weight Load Calculations
  const legsPart = findLegsPart(selectedPartsArray);
  const maxLoadLimit = legsPart ? legsPart.LoadLimit : 0;
  const totalLoad = useMemo(() => calculateTotalLoad(selectedPartsArray, currentSlotIndex), [selectedPartsArray, currentSlotIndex]);

  // EN Load Calculations
  const generatorPart = findGeneratorPart(selectedPartsArray);
  const maxENLoadLimit = generatorPart ? generatorPart.ENOutput : 0;
  const totalENLoad = useMemo(() => calculateTotalEN(selectedPartsArray, currentSlotIndex), [selectedPartsArray, currentSlotIndex]);

  return (
    <ul>
      {parts.filter(part => part.PartName.toLowerCase().includes(filterText.toLowerCase())).map((part, index) => {
        const isWeightOverloaded = checkTotalLoadOverload(part, totalLoad, maxLoadLimit, selectedPartsArray);
        const isENOverloaded = checkTotalENOverload(part, totalENLoad, maxENLoadLimit, selectedPartsArray);
        
        return (
          <li className={`p-2 cursor-pointer ${clickedPart === part ? 'bg-cyan-900' : 'hover:bg-gray-600'}`} key={part.PartName}
            onClick={(event) => onPartClick(part, event, index)}>
            <div className="flex flex-col items-center">
              <div>{part.PartName}</div>
              {isWeightOverloaded && <div className="text-red-500">Weight Overload</div>}
              {isENOverloaded && <div className="text-blue-500">EN Overload</div>}
              <img src={process.env.PUBLIC_URL + '/' + part.imagePath} alt={part.PartName} className="h-24 mt-2" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default PartList;
