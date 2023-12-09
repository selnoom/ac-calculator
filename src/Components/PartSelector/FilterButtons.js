import React, { useMemo } from 'react';

export const filterParts = (parts, activeFilters) => {
  return parts.filter(part => {
      for (const filter of activeFilters) {
          if ((filter === 'Arm' && part.PartFilter === 'Arm') ||
              (filter === 'Shoulder' && part.PartFilter === 'Shoulder') ||
              (filter === 'Tank' && part.LegType === 'Tank') ||
              (filter === 'Bipedal' && part.LegType === 'Bipedal') ||
              (filter === 'Tetrapod' && part.LegType === 'Tetrapod') ||
              (filter === 'Internal combustion' && part.GeneratorType === 'Internal combustion') ||
              (filter === 'Circulating-current' && part.GeneratorType === 'Circulating-current') ||
              (filter === 'Coral' && part.GeneratorType === 'Coral')) {
              return true;
          }
      }
      return activeFilters.length === 0; // Show all parts if no filter is active
  });
};

const FilterButton = ({ filterName, isActive, toggleFilter }) => {
    return (
        <button 
            className={`px-3 py-1 my-1 ml-2 rounded sm:text-sm text-xs ${isActive ? 'bg-blue-500' : 'bg-gray-500'} text-white`}
            onClick={() => toggleFilter(filterName)}
        >
            {filterName}
        </button>
    );
};

export const FilterButtonsGroup = ({ partType, boxIndex, selectorIndex, activeFilters, toggleFilter }) => {
    const filters = useMemo(() => {
        if (boxIndex === 0) { // Weapons box
            return (selectorIndex === 2 || selectorIndex === 3) ? ["Arm", "Shoulder"] : [];
        } else if (boxIndex === 1) { // Body parts box
            return selectorIndex === 3 ? ["Tank", "Bipedal", "Tetrapod"] : []; // Filter for legs
        } else if (boxIndex === 2) { // Inner parts box
            return partType === "generator" ? ["Internal combustion", "Circulating-current", "Coral"] : [];
        }
        return [];
    }, [boxIndex, selectorIndex, partType]);

    return (
      <div className="flex flex-wrap space-x-2 mb-4">
        {filters.map(filterName => (
          <FilterButton 
            key={filterName}
            filterName={filterName}
            isActive={activeFilters.includes(filterName)}
            toggleFilter={toggleFilter}
          />
        ))}
      </div>
    );
};