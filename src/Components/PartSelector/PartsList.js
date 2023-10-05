import React from "react";

function PartList({ parts, filterText, onPartClick, clickedPart }) {
    return (
      <ul>
        {parts.filter(part => part.PartName.toLowerCase().includes(filterText.toLowerCase())).map(part => (
          <li className={`p-2 cursor-pointer ${clickedPart === part ? 'bg-cyan-900' : 'hover:bg-gray-600'}`} key={part.PartName}
              onClick={(event) => onPartClick(part, event)}>
            <div className="flex flex-col items-center">
              <div>{part.PartName}</div>
              <img src={part.imagePath} alt={part.PartName} className="h-24 mt-2" />
            </div>
          </li>
        ))}
      </ul>
    );
  }
  
export default PartList;