import React from "react";
import StatBar from "./StatBar";

function ModalStatsDisplay({ clickedPart, maxValues }) {
    if (!clickedPart) return null;

    const formatStatValue = (key, value) => {
      if (typeof value === 'object' && value.value && value.times) {
        // Return a string in the format "value x times"
        return `${value.value} x ${value.times}`;
      } else if (typeof value === 'number') {
        // Just return the number as a string
        return value.toString();
      }
      return null;
    };

    return (
      <div className="w-3/5 px-4 bg-gray-800 max-h-[calc(100%-3rem)] overflow-y-auto">
        {Object.keys(clickedPart).map(key => {
          const formattedValue = formatStatValue(key, clickedPart[key]);
          if (formattedValue !== null) {
            return (
              <StatBar
                key={key}
                statName={key}
                value={typeof clickedPart[key] === 'object' ? clickedPart[key].value : clickedPart[key]} // Use the numerical value for bar calculations
                displayValue={formattedValue} // Use the formatted string for display
                maxValue={maxValues[key]}
              />
            );
          }
          return null;
        })}
      </div>
    );
}

export default ModalStatsDisplay;
