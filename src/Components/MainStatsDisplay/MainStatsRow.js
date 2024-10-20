import React from 'react';
import MainStatBar from './MainStatBar';

function MainStatsRow({ name, value, isBar = false, maxValue = 0, roundTo = 1 }) {
    const shouldShowValue = value !== undefined && value !== null && !isNaN(value) && value !== 0;
    const roundFactor = 1 / roundTo;
    const roundedValue = Math.round(value * roundFactor) / roundFactor;
    const displayValue = isBar 
        ? `${Math.round(value || 0)} / ${Math.round(maxValue)}`
        : (shouldShowValue ? roundedValue : '');
    
    const shouldShowBar = isBar;

    return (
        <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
                <span>{name}:</span>
                <span>{displayValue}</span>
            </div>
            {shouldShowBar && <MainStatBar value={Math.round(value || 0)} maxValue={Math.round(maxValue)} />}
        </div>
    );
}

export default MainStatsRow;
