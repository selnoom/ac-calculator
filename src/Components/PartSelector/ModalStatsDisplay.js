import React from "react";
import StatBar from "./StatBar";

function ModalStatsDisplay({ clickedPart, maxValues }) {
    if (!clickedPart) return null;
    return (
      <div className="w-3/5 px-4 bg-gray-800 max-h-[calc(100%-3rem)] overflow-y-auto">
        {Object.keys(clickedPart).map(key => {
          if (typeof clickedPart[key] === 'number') {
            return (
              <StatBar
                key={key}
                statName={key}
                value={clickedPart[key]}
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
  