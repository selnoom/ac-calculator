// Utility functions for calculating overloads

// Weight Overload Calculations
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
  
  export const checkTotalLoadOverload = (part, totalLoad, maxLoadLimit, selectedPartsArray) => {
    const noLeg = part.LoadLimit && !selectedPartsArray.some(p => p && p.LoadLimit);
    if (noLeg) {
      return false;
    } else if (part.LoadLimit) {
      return totalLoad > maxLoadLimit;
    } else {
      return totalLoad + part.Weight > maxLoadLimit;
    }
  };
  
  // EN Overload Calculations
  export const calculateTotalEN = (selectedPartsArray, currentSlotIndex) => {
    return selectedPartsArray.reduce((total, part, index) => {
      if (index !== currentSlotIndex && part && !part.ENCapacity) {
        return total + part.ENLoad;
      }
      return total;
    }, 0);
  };

  export const findGeneratorPart = (selectedPartsArray) => {
    return selectedPartsArray.find(part => part && part.ENCapacity);
  };

  export const checkTotalENOverload = (part, totalENLoad, maxENLoadLimit, selectedPartsArray) => {
    const noGenerator = part.ENCapacity && !selectedPartsArray.some(p => p && p.ENCapacity);
    if (noGenerator) {
      return false;
    } else if (part.ENCapacity) {
      return totalENLoad > maxENLoadLimit;
    } else {
      return totalENLoad + part.ENLoad > maxENLoadLimit;
    }
  };

  // Arms Overload Calculations