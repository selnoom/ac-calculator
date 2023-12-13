function computeTotalStats(parts) {
    let totalAP = 0;
    let totalENLoad = 0;
    let ENOutput = 0;
    let totalENCapacity = 0;
    let totalWeight = 0;
    let legWeight = 0;
    let loadLimit = 0;
    let totalArmsLoad = 0;
    let armsLoadLimit = 0;
    let totalAttitudeStability = 0;
    let totalAttitudeRecovery = 0;
    let totalAntiKineticDefense = 0;
    let totalAntiEnergyDefense = 0;
    let totalAntiExplosiveDefense = 0;
    let firearmSpec = 0;
    let speed = 0;
    let QBReloadTime = 0;
    let QBENConsumption = 0;
    let QBSpeed = 0;
    let generatorOutputAdj = 0;

    // Remove null and undefined values from array
    parts = parts.filter(part => part !== null && part !== undefined);
  
    // If cleaned array is empty, return some default values or reset stats
    if (parts.length === 0) {
      return {
        // Possible default stats, like AP: 0, EN_load: 0, etc.
      };
    }

    parts.forEach(part => {
        if (!part) return; // In case no part is selected and save is pressed

        // Checks if leg part
        if (part.LoadLimit > 0) {
          legWeight = part.Weight;
          loadLimit = part.LoadLimit;
        }

        // Check if arm part
        if (part.ArmLoader && part.ArmLoader === true) {
          totalArmsLoad += part.Weight;
        }

        totalAP += part.AP || 0;
        totalENLoad += part.ENLoad || 0;
        totalENCapacity += part.ENCapacity || 0;
        totalWeight += part.Weight || 0;
        totalAttitudeStability += part.AttitudeStability || 0;
        totalAttitudeRecovery += part.AttitudeRecovery || 0;
        totalAntiKineticDefense += part.AntiKineticDefense || 0;
        totalAntiEnergyDefense += part.AntiEnergyDefense || 0;
        totalAntiExplosiveDefense += part.AntiExplosiveDefense || 0;
        ENOutput += part.ENOutput || 0;
        armsLoadLimit += part.ArmsLoadLimit || 0;
        firearmSpec += part.FirearmSpecialization || 0;
        speed += part.Speed || 0;
        QBReloadTime += part.QBReloadTime || 0;
        QBENConsumption += part.QBENConsumption || 0;
        QBSpeed += part.QBSpeed || 0;
        generatorOutputAdj += part.GeneratorOutputAdj || 0;

        if (generatorOutputAdj > 0) {
          ENOutput = ENOutput * 0.01 * generatorOutputAdj;
        }
    });
  
    return {
      AP: totalAP,
      EN_load: totalENLoad,
      EN_output: ENOutput,
      EN_capacity: totalENCapacity,
      total_weight: totalWeight,
      total_load: totalWeight - legWeight,
      total_arms_load: totalArmsLoad,
      load_limit: loadLimit,
      arms_load_limit: armsLoadLimit,
      attitude_stability: totalAttitudeStability,
      attitude_recovery: totalAttitudeRecovery,
      anti_kinetic_defense: totalAntiKineticDefense,
      anti_energy_defense: totalAntiEnergyDefense,
      anti_explosive_defense: totalAntiExplosiveDefense,
      firearm_spec: firearmSpec,
      speed: speed,
      qb_reload_time: QBReloadTime,
      qb_EN_consumption: QBENConsumption,
      qb_speed: QBSpeed,
    };
  }

  export default computeTotalStats;