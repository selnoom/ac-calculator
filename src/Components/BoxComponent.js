import React, { useState } from 'react';
import { loadLegs } from '../Utilities/loadParts';

function BoxComponent() {
  const [showList, setShowList] = useState(false);
  const [parts, setParts] = useState([]);

  const handleClick = () => {
    if (!showList) {
      // Load the parts when the box is clicked for the first time
      setParts(loadLegs());
    }
    setShowList(!showList);
  };

  return (
    <div className="relative">
        <div className="w-64 h-32 bg-gray-300 p-4 border border-gray-400 cursor-pointer"
         onClick={handleClick}>
          Box
          {showList && (
            <ul className="absolute bg-white border border-gray-400 mt-2 w-64">
              {parts.map(part => (
                <li className="p-2 hover:bg-gray-200 cursor-pointer"
                 key={part.id}>{part.id}</li>
              ))}
            </ul>
          )}
        </div>
    </div>
  );
}

export default BoxComponent;