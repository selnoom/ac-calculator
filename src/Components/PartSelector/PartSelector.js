import React, { useState, useEffect, useContext, useMemo } from 'react'; 
import Modal from '../PartsModal/PartsModal';
import loadDataForPartType from '../../Utilities/loadParts';
import FilterInput from './FilterInput';
import PartList from './PartsList';
import ModalStatsDisplay from './ModalStatsDisplay';
import PartsContext from '../../Contexts/PartsContext';
import CustomConfirmModal from '../CustomConfirmModal';
import { FilterButtonsGroup, filterParts  } from './FilterButtons';

function PartSelector({ placeholder, onPartSelected, partType, boxIndex, selectorIndex, selectedPart: propSelectedPart }) {
  const [showList, setShowList] = useState(false);
  const [parts, setParts] = useState([]);
  const [maxValues, setMaxValues] = useState({});
  const [clickedPart, setClickedPart] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [selectedPart, setSelectedPart] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {selectedPartsArray, setSelectedPartsArray} = useContext(PartsContext);
  const [activeFilters, setActiveFilters] = useState([]);
  const partIndex = boxIndex * (4) + selectorIndex;
  const isBooster = partType === "booster";
  const isBoosterDisabled = isBooster && selectedPartsArray.some(part => part?.LegType === "Tank");
  const filteredParts = useMemo(() => filterParts(parts, activeFilters), [parts, activeFilters]);

  const toggleFilter = (filterName) => {
    setActiveFilters(currentFilters => {
        if (currentFilters.includes(filterName)) {
            return currentFilters.filter(f => f !== filterName);
        } else {
            return [...currentFilters, filterName];
        }
    });
  };

  // When selectedPartsArray changes, update the selectedPart
  useEffect(() => {
    if (selectedPartsArray[partIndex] === null) {
      setSelectedPart(null);
    }
  }, [selectedPartsArray, partIndex]);

  useEffect(() => {
    setSelectedPart(propSelectedPart);
  }, [propSelectedPart]);

  const handleSave = () => {
    if (partType === "legs" && clickedPart?.LegType === "Tank") {
      const boosterIsSelected = selectedPartsArray.some(part => part && part.PartSlot[0] === "Boosters");
      if (boosterIsSelected) {
        setShowConfirmModal(true);
        return;
      }
    }
    saveSelectedPart();
  };

  const saveSelectedPart = () => {
    if (boxIndex === 0 && (selectorIndex === 0 || selectorIndex === 1)) { 
      const updatedPart = { ...clickedPart, ArmLoader: true };
      setSelectedPart(updatedPart);
      setShowList(false); 
      onPartSelected(updatedPart);
    } else {
      setSelectedPart(clickedPart);
      setShowList(false); 
      onPartSelected(clickedPart);
    }
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
        const allowedSlots = determineAllowedSlots(selectorIndex);
        const parts = loadDataForPartType(partType, allowedSlots);  // Pass partType and allowedSlots
        setParts(parts);
    }
    setFilterText("");  // Clear the filter text every time the modal is toggled
    setShowList(prevShowList => !prevShowList);
  };

  const determineAllowedSlots = (selectorIndex) => {
    switch (selectorIndex) {
      case 0: // Right Arm
        return ["Right Arm"];
      case 1: // Left Arm
        return ["Left Arm", "Right Arm"];
      case 2: // Right Shoulder
        return ["Right Shoulder", "Right Arm"];
      case 3: // Left Shoulder
        return ["Left Shoulder", "Right Shoulder", "Left Arm", "Right Arm"];
      default:
        return [];
    }
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
          if (typeof part[key] === 'number') {
            if (!values[key] || part[key] > values[key]) {
              values[key] = part[key];
            }
          }
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
      handleSave();
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
                  <FilterButtonsGroup 
                    partType={partType} 
                    boxIndex={boxIndex} 
                    selectorIndex={selectorIndex}
                    activeFilters={activeFilters} 
                    toggleFilter={toggleFilter}
                  />
                  <FilterInput value={filterText} onChange={e => setFilterText(e.target.value)} placeholder="Search parts..." />
                <PartList 
                  parts={filteredParts} 
                  filterText={filterText} 
                  onPartClick={handlePartClick} 
                  clickedPart={clickedPart} 
                  boxIndex={boxIndex} 
                  selectorIndex={selectorIndex} 
                  activeFilters={activeFilters}
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