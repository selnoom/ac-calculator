export function getTargetTracking(firearmSpec) {
  if (firearmSpec === 0 || firearmSpec == null) return null;

  const mapping = [
    { firearmSpec: 26,  targetTracking: 41 },
    { firearmSpec: 45,  targetTracking: 72 },
    { firearmSpec: 53,  targetTracking: 80 },
    { firearmSpec: 80,  targetTracking: 86 },
    { firearmSpec: 88,  targetTracking: 87 },
    { firearmSpec: 92,  targetTracking: 88 },
    { firearmSpec: 95,  targetTracking: 89 },
    { firearmSpec: 96,  targetTracking: 89 },
    { firearmSpec: 100, targetTracking: 90 },
    { firearmSpec: 102, targetTracking: 90 },
    { firearmSpec: 103, targetTracking: 90 },
    { firearmSpec: 104, targetTracking: 90 },
    { firearmSpec: 122, targetTracking: 94 },
    { firearmSpec: 123, targetTracking: 94 },
    { firearmSpec: 128, targetTracking: 95 },
    { firearmSpec: 133, targetTracking: 96 },
    { firearmSpec: 136, targetTracking: 97 },
    { firearmSpec: 160, targetTracking: 104 }
  ];

  const matchedValue = mapping.find(item => firearmSpec <= item.firearmSpec);
  return matchedValue ? matchedValue.targetTracking : null;
}
  
export function computeBoostSpeed(totalWeight, hiddenBoostValue) {
  let multiplier;

  if (totalWeight <= 40000) {
      multiplier = 1;
  } else if (totalWeight <= 62500) {
      // Linear interpolation between 1 and 0.925
      multiplier = 1 - 0.075 * ((totalWeight - 40000) / 22500);
  } else if (totalWeight <= 75000) {
      // Linear interpolation between 0.925 and 0.85
      multiplier = 0.925 - 0.075 * ((totalWeight - 62500) / 12500);
  } else if (totalWeight <= 80000) {
      // Linear interpolation between 0.85 and 0.775
      multiplier = 0.85 - 0.075 * ((totalWeight - 75000) / 5000);
  } else if (totalWeight <= 120000) {
      // Linear interpolation between 0.775 and 0.65
      multiplier = 0.775 - 0.125 * ((totalWeight - 80000) / 40000);
  } else {
      multiplier = 0.65;
  }

  return hiddenBoostValue * multiplier;
}

export function computeAttitudeRecovery(weight) {
  const baseValue = 100;
  let multiplier = 0;

  if (weight <= 40000) {
    multiplier = 1.5;
  } else if (weight <= 60000) {
    // Linear interpolation between 1.5 and 1.2
    multiplier = 1.5 - 0.3 * ((weight - 40000) / 20000);
  } else if (weight <= 80000) {
    // Linear interpolation between 1.2 and 0.9
    multiplier = 1.2 - 0.3 * ((weight - 60000) / 20000);
  } else if (weight <= 110000) {
    // Linear interpolation between 0.9 and 0.6
    multiplier = 0.9 - 0.3 * ((weight - 80000) / 30000);
  } else if (weight <= 140000) {
    // Linear interpolation between 0.6 and 0.57
    multiplier = 0.6 - 0.03 * ((weight - 110000) / 30000);
  } else {
    multiplier = 0.57;
  }

  return baseValue * multiplier;
}
