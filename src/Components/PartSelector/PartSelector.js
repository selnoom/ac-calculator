import React, { useState, useEffect, useContext } from 'react'; 
import Modal from '../PartsModal/PartsModal';
import loadDataForPartType from '../../Utilities/loadParts';
import FilterInput from './FilterInput';
import PartList from './PartsList';
import ModalStatsDisplay from './ModalStatsDisplay';
import PartsContext from '../../Contexts/PartsContext';
import CustomConfirmModal from '../CustomConfirmModal';

function PartSelector({ placeholder, onPartSelected, partType, boxIndex, selectorIndex }) {
  const [showList, setShowList] = useState(false);
  const [parts, setParts] = useState([]);
  const [maxValues, setMaxValues] = useState({});
  const [clickedPart, setClickedPart] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [selectedPart, setSelectedPart] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {selectedPartsArray, setSelectedPartsArray} = useContext(PartsContext);
  const partIndex = boxIndex * (4) + selectorIndex;
  const isBooster = partType === "booster";
  const isBoosterDisabled = isBooster && selectedPartsArray.some(part => part?.LegType === "Tank");

  // When selectedPartsArray changes, update the selectedPart
  useEffect(() => {
    if (selectedPartsArray[partIndex] === null) {
      setSelectedPart(null);
    }
  }, [selectedPartsArray, partIndex]);

  const handleSave = () => {
    if (partType === "legs" && clickedPart?.LegType === "Tank") {
      const boosterIsSelected = selectedPartsArray.some(part => part && part.PartType === "Booster");
      if (boosterIsSelected) {
        setShowConfirmModal(true);
        return; // Don't continue with the rest of the logic until user's decision
      }
    }

    saveSelectedPart();
  };

  const saveSelectedPart = () => {
    setSelectedPart(clickedPart);
    setShowList(false);  // Close the modal after saving

    // Notify the parent (PartBox) about the selection
    onPartSelected(clickedPart);
  };

  const handleConfirm = () => {
    // Remove the booster from selectedPartsArray
    const newPartsArray = selectedPartsArray.filter(part => part && part.PartType !== "Booster");
    
    // Update the state/context with the new parts array
    setSelectedPartsArray(newPartsArray);
    
    // Continue with saving the tank tread legs
    setSelectedPart(clickedPart);
  
    // Notify the parent (PartBox) about the selection
    onPartSelected(clickedPart);
  
    // Close both modals
    setShowList(false);
    setShowConfirmModal(false);
  };
  

  const handleCancel = () => {
      setShowConfirmModal(false);
  };

  // Toggle the modal's visibility. If opening the modal for the first time, load the parts.
  const toggleModal = async () => {
    if (!showList && parts.length === 0) {
      const parts = loadDataForPartType(partType);
      setParts(parts);
    }
    setShowList(prevShowList => !prevShowList);
  };

  const handleClearPart = (event) => {
    event.stopPropagation(); // Prevent this click from opening the modal
    setSelectedPart(null); // Clear the selected part
    onPartSelected(null); // Inform the parent component about the clearing
  };

  // Calculate the maximum values once the parts are loaded
  useEffect(() => {
    const calculateMaxValues = () => {
      const values = {};
      parts.forEach(part => {
        Object.keys(part).forEach(key => {
          // Check if the property is a number
          if (typeof part[key] === 'number') {
            if (!values[key] || part[key] > values[key]) {
              values[key] = part[key];
            }
          }
          // Check if the property is an object with a 'value' property
          else if (part[key] && typeof part[key] === 'object' && typeof part[key].value === 'number') {
            if (!values[key] || part[key].value > values[key]) {
              values[key] = part[key].value;
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

  if (isBoosterDisabled) {
    return (
      <div className="bg-gray-700 text-white p-4 border border-gray-600 opacity-50 cursor-not-allowed relative w-full h-full">
        <div>{placeholder}</div>
        <div className="h-24 mt-2 flex items-center justify-center">
          <span>Unavailable (Tank Legs Selected)</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
  <div 
    className="bg-gray-700 border border-gray-600 cursor-pointer w-full h-full"
    onClick={toggleModal}
    style={
      selectedPart ? { 
        backgroundImage: `url(${process.env.PUBLIC_URL}/${selectedPart.imagePath})`,
        backgroundSize: '100% 100%', // Stretch image to fill the div
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      } : {}
    }
  >
    {selectedPart ? (
      <>
        <div className="absolute top-0 left-0 w-full h-full">
          <span className="bg-black bg-opacity-50 text-white px-1 font-bold">
            {selectedPart.PartName}
          </span>
        </div>
      </>
    ) : (
      <div className="flex justify-center items-center h-full text-lg font-semibold text-blue-200">
        {placeholder}
      </div>
    )}
    {selectedPart && (
      <div className="absolute top-1 right-1 text-white bg-red-600 rounded-full h-6 w-6 flex items-center justify-center cursor-pointer"
           onClick={handleClearPart}>
        X
      </div>
    )}
        <Modal isOpen={showList}>
          <div className="flex flex-col h-full" onClick={handleModalContentClick}>
            <div className="flex items-stretch h-[calc(100%-3rem)]">
              <ul className="w-2/5 overflow-y-auto border-r border-gray-600 h-full pr-3">
                <div className="sticky top-0">
                  <FilterInput value={filterText} onChange={e => setFilterText(e.target.value)} placeholder="Search parts..." />
                </div>
                <PartList 
                  parts={parts} 
                  filterText={filterText} 
                  onPartClick={handlePartClick} 
                  clickedPart={clickedPart} 
                  boxIndex={boxIndex} 
                  selectorIndex={selectorIndex} 
                />
              </ul>
              <ModalStatsDisplay clickedPart={clickedPart} maxValues={maxValues} />
            </div>
            <div className="flex justify-end mt-4 space-x-8 pr-10">
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
      <CustomConfirmModal 
            isOpen={showConfirmModal} 
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            message="Tank Tread legs have an integrated booster. Do you want to continue and remove the current booster?"
        />
    </div>
  );
}

export default PartSelector;