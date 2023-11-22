import React from "react";

function MainStatBar({ value, maxValue }) {
    // Check if both value and maxValue are 0
    const isInactive = value === 0 && maxValue === 0;

    // Set barWidth to 0 if inactive, otherwise calculate normally
    const barWidth = isInactive ? 0 : Math.min((value / maxValue) * 100, 100);

    // Set barColor to grey if inactive, otherwise calculate normally
    const barColor = isInactive ? "bg-gray-400" : (value > maxValue ? "bg-red-800" : "bg-blue-500");

    return (
        <div className="bg-gray-500 w-full h-4 rounded relative mt-1 overflow-hidden">
            <div
                className={`absolute h-full ${barColor} rounded`}
                style={{ width: `${barWidth}%` }}
            ></div>
        </div>
    );
}

export default MainStatBar;
