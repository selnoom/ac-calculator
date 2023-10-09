import React from "react";

function MainStatBar({ value, maxValue }) {
    const barWidth = Math.min((value / maxValue) * 100, 100); // Calculate width as a percentage but ensure it doesn't exceed 100%
    const barColor = value > maxValue ? "bg-red-800" : "bg-blue-500"; // Conditional color based on value and maxValue

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
