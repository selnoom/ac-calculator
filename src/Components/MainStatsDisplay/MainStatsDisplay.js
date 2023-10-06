import React, { useState, useEffect } from 'react';
import computeTotalStats from '../../Utilities/ComputeTotalStats';

function MainStatsDisplay({ selectedParts }) {
  const [totalStats, setTotalStats] = useState({});

  useEffect(() => {
    const computedStats = computeTotalStats(selectedParts);
    setTotalStats(computedStats);
  }, [selectedParts]);

  return (
    <div className="main-stats-display">
      <span>AP: {totalStats.AP}</span>
      <span>Defensive Performance: {totalStats.defensivePerformance}</span>
      {/* ... other key stats ... */}
    </div>
  );
}

export default MainStatsDisplay;
