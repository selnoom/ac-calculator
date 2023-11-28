import React from 'react';

function StatBar({ statName, value, maxValue, displayValue }) {
    const barWidth = (value / maxValue) * 100; // Calculate width as a percentage
  
    return (
      <div className="my-2">
        <div className="flex justify-between text-sm mb-1">
          <span>{statName}</span>
          <span>{displayValue || value}</span> {/* Use displayValue if provided, otherwise fallback to value */}
        </div>
        <div className="bg-gray-700 w-full h-4 rounded relative">
          <div
            className="absolute h-full bg-blue-500 rounded"
            style={{ width: `${barWidth}%` }}
          ></div>
        </div>
      </div>
    );
}

export default StatBar;
