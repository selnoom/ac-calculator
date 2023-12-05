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
export const findArmsPart = (selectedPartsArray) => {
  // Find the part with "Arms" in PartSlot or ArmsLoadLimit property
  return selectedPartsArray.find(part => part?.PartSlot?.includes("Arms") || part?.ArmsLoadLimit);
};

export const calculateTotalArmsLoad = (selectedPartsArray, potentialNewPart, currentSlotIndex) => {
  let totalArmsLoad = 0;

  // Calculate the load for the current arm (left or right)
  if (currentSlotIndex === 0 || currentSlotIndex === 1) {
    totalArmsLoad += potentialNewPart.Weight || 0; // Add weight of the new part if exists
  }

  // Add the weight of the part in the opposite arm slot
  const oppositeArmIndex = currentSlotIndex === 0 ? 1 : 0;
  totalArmsLoad += selectedPartsArray[oppositeArmIndex]?.Weight || 0;

  return totalArmsLoad;
};

export const checkArmsLoadOverload = (selectedPartsArray, armsPart, potentialNewPart, currentSlotIndex) => {
  const totalArmsLoad = calculateTotalArmsLoad(selectedPartsArray, potentialNewPart, currentSlotIndex);
  if (!armsPart) return true;
  else return totalArmsLoad > armsPart?.ArmsLoadLimit;
};

// Utility function to calculate total weight of weapons on both arms
const calculateTotalArmsWeaponsWeight = (selectedPartsArray) => {
  const rightArmWeaponWeight = selectedPartsArray[0]?.Weight || 0; // Assuming right arm weapon is at index 0
  const leftArmWeaponWeight = selectedPartsArray[1]?.Weight || 0; // Assuming left arm weapon is at index 1
  return rightArmWeaponWeight + leftArmWeaponWeight;
};

// Check if selecting an arm part would cause an overload due to the weight of the weapons
export const checkArmsCapabilityOverload = (armPart, selectedPartsArray) => {
  if (armPart.PartSlot.includes("Arms")) {
    const totalWeaponsWeight = calculateTotalArmsWeaponsWeight(selectedPartsArray);
    return totalWeaponsWeight > (armPart.ArmsLoadLimit || 0); // Check against arms load limit
  }
  return false;
};