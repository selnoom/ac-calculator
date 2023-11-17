// Utility functions for calculating overloads

export const calculateTotalLoad = (selectedPartsArray, currentSlotIndex) => {
    return selectedPartsArray.reduce((total, part, index) => {
      if (index !== currentSlotIndex && part && !part.LoadLimit) {
        return total + part.Weight;
      }
      return total;
    }, 0);
  };
  
  export const findLegsPart = (selectedPartsArray) => {
    return selectedPartsArray.find(part => part && part.LoadLimit);
  };
  
  export const checkTotalLoadOverload = (part, totalLoad, maxLoadLimit) => {
    if (part.LoadLimit) {
      return totalLoad > maxLoadLimit;
    } else {
      return totalLoad + part.Weight > maxLoadLimit;
    }
  };
  