import React, { useState, useEffect } from 'react';
import Modal from '../PartsModal/PartsModal';
import loadDataForPartType from '../../Utilities/loadParts';
import FilterInput from './FilterInput';
import PartList from './PartsList';
import ModalStatsDisplay from './ModalStatsDisplay';

function PartSelector({ placeholder, onPartSelected, partType  }) {
  const [showList, setShowList] = useState(false);
  const [parts, setParts] = useState([]);
  const [maxValues, setMaxValues] = useState({});
  const [clickedPart, setClickedPart] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [selectedPart, setSelectedPart] = useState(null);

  const handleSave = () => {
    setSelectedPart(clickedPart);
    setShowList(false);  // Close the modal after saving

    // Notify the parent (PartBox) about the selection
    onPartSelected(clickedPart);
  }

  // Toggle the modal's visibility. If opening the modal for the first time, load the parts.
  const toggleModal = async () => {
    if (!showList && parts.length === 0) {
      const parts = loadDataForPartType(partType);
      setParts(parts);
    }
    setShowList(prevShowList => !prevShowList);
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

  const handlePartClick = (part, event) => {
    event.stopPropagation(); // Stop the event from propagating to the modal background
    if (clickedPart === part) {
      setClickedPart(null);
    } else {
      setClickedPart(part);
    }
  }

  const handleModalContentClick = (event) => {
    event.stopPropagation();
  }

  return (
    <div className="relative">
      <div className="bg-gray-700 text-white p-4 border border-gray-600 cursor-pointer"
        onClick={toggleModal}>
        {selectedPart ? (
            <>
              <div>{selectedPart.PartName}</div>
              <img src={selectedPart.imagePath} alt={selectedPart.PartName} className="h-24 mt-2" />
            </>
          ) : placeholder}
        <Modal isOpen={showList}>
          <div className="flex flex-col h-full" onClick={handleModalContentClick}>
            <div className="flex items-stretch h-[calc(100%-3rem)]">
              <ul className="w-2/5 overflow-y-auto border-r border-gray-600 h-full">
                <FilterInput value={filterText} onChange={e => setFilterText(e.target.value)} placeholder="Search parts..." />
                <PartList parts={parts} filterText={filterText} onPartClick={handlePartClick} clickedPart={clickedPart} />
              </ul>
              <ModalStatsDisplay clickedPart={clickedPart} maxValues={maxValues} />
            </div>
            <div className="flex justify-end mt-4 space-x-8">
              <button onClick={handleSave} 
                className="bg-blue-800 hover:bg-blue-600 text-white rounded px-6 py-2">
                Save
              </button>
              <button onClick={() => setShowList(false)} 
                className="bg-red-900 hover:bg-red-700 text-white rounded px-4 py-2">
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default PartSelector;