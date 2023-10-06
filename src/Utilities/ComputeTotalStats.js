import { average } from "./Math";

function computeTotalStats(parts) {
    let totalAP = 0;
    let totalDefensivePerformance = 0;
  
    parts.forEach(part => {
        if (!part) return; // In case no part selected and saved
        totalAP += part.AP || 0;
        totalDefensivePerformance += 
        average(part.AntiKineticDefense, part.AntiEnergyDefense, part.AntiExplosiveDefense) || 0;
    });
  
    return {
      AP: totalAP,
      defensivePerformance: totalDefensivePerformance,
      // ... other stats ...
    };
  }

  export default computeTotalStats;