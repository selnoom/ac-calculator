import React from 'react';

function StatBar({ statName, value, maxValue }) {
  const barWidth = (value / maxValue) * 100; // Calculate width as a percentage

  return (
    <div className="my-2">
      <div className="text-sm mb-1">{statName}</div>
      <div className="bg-gray-700 w-full h-4 rounded">
        <div
          className="h-full bg-blue-500 rounded"
          style={{ width: `${barWidth}%` }}
        ></div>
      </div>
    </div>
  );
}

export default StatBar;
