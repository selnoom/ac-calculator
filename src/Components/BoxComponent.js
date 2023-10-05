import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { loadHeads } from '../Utilities/loadParts';
import StatBar from './StatBar';

function BoxComponent() {
  const [showList, setShowList] = useState(false);
  const [parts, setParts] = useState([]);
  const [maxValues, setMaxValues] = useState({});
   const [hoveredPart, setHoveredPart] = useState(null);

  const handleClick = () => {
    if (!showList) {
      // Load the parts when the box is clicked for the first time
      setParts(loadHeads());
    }
    setShowList(!showList);
  };

  // Calculate the maximum values once the parts are loaded
  useEffect(() => {
    const calculateMaxValues = () => {
      const values = {};

      parts.forEach(part => {
        Object.keys(part).forEach(key => {
          if (typeof part[key] === 'number') {
            if (!values[key] || part[key] > values[key]) {
              values[key] = part[key];
            }
          }
        });
      });

      setMaxValues(values);
    };

    calculateMaxValues();
  }, [parts]);


  return (
    <div className="relative">
        <div className="w-64 h-32 bg-gray-700 text-white p-4 border border-gray-600 cursor-pointer"
         onClick={handleClick}>
          Box
          <Modal isOpen={showList}>
            <div className="flex items-stretch">
              <ul className="w-2/5 overflow-y-auto border-r border-gray-600 h-80"> {/* Add a height here to make it scrollable */}
                {parts.map(part => (
                  <li className="p-2 hover:bg-gray-600 cursor-pointer" key={part.PartName}
                      onMouseEnter={() => setHoveredPart(part)} // <-- Update the hovered part on mouse enter
                      onMouseLeave={() => setHoveredPart(null)}> {/* Reset on mouse leave */}
                    <div className="flex flex-col items-center">
                      <div>{part.PartName}</div>
                      <img src={part.imagePath} alt={part.PartName} className="h-24 mt-2" />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="w-3/5 pl-4 bg-gray-800">
                {hoveredPart && Object.keys(hoveredPart).map(key => { // <-- Use hoveredPart instead of parts[0]
                  if (typeof hoveredPart[key] === 'number') {
                    return (
                      <StatBar
                        key={key}
                        statName={key}
                        value={hoveredPart[key]}
                        maxValue={maxValues[key]}
                      />
                    );
                  }
                  return null;
                })}
              </div>
            </div>
            <button onClick={() => setShowList(false)} className="mt-4 bg-red-600 text-white rounded px-4 py-2">Close</button>
          </Modal>
        </div>
    </div>
  );
}

export default BoxComponent;
