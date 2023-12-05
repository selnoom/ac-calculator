import React from 'react';

function StatBar({ statName, value, maxValue, displayValue }) {
    const barWidth = (value / maxValue) * 100; // Calculate width as a percentage
  
    return (
      <div className="my-2">
        <div className="flex flex-col sm:flex-row justify-start mb-1 text-xs md:text-sm lg:text-base">
          <span className="flex items-center">{statName}:&nbsp;<span className="sm:ml-2">{displayValue || value}</span></span>
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
