import React, { useContext, useMemo } from 'react';
import PartsContext from "../../Contexts/PartsContext";
import { calculateTotalLoad, findLegsPart, checkTotalLoadOverload } from '../../Utilities/overLoadCalculations';

function PartList({ parts, filterText, onPartClick, clickedPart, boxIndex, selectorIndex }) {
  const { selectedPartsArray } = useContext(PartsContext);
  const currentSlotIndex = boxIndex * 4 + selectorIndex;
  const legsPart = findLegsPart(selectedPartsArray);
  const maxLoadLimit = legsPart ? legsPart.LoadLimit : 0;
  const totalLoad = useMemo(() => calculateTotalLoad(selectedPartsArray, currentSlotIndex), [selectedPartsArray, currentSlotIndex]);

  return (
    <ul>
      {parts.filter(part => part.PartName.toLowerCase().includes(filterText.toLowerCase())).map((part, index) => {
        const isOverloaded = checkTotalLoadOverload(part, totalLoad, maxLoadLimit);
        return (
          <li className={`p-2 cursor-pointer ${clickedPart === part ? 'bg-cyan-900' : 'hover:bg-gray-600'}`} key={part.PartName}
            onClick={(event) => onPartClick(part, event, index)}>
            <div className="flex flex-col items-center">
              <div>{part.PartName}</div>
              {isOverloaded && <div className="text-red-500">Weight Overload</div>}
              <img src={process.env.PUBLIC_URL + '/' + part.imagePath} alt={part.PartName} className="h-24 mt-2" />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default PartList;
