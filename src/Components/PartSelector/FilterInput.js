import React from 'react';

function FilterInput({ value, onChange, placeholder = "Filter parts..." }) {
  return (
    <input 
      type="text" 
      placeholder={placeholder} 
      value={value}
      onChange={onChange}
      className="p-2 w-96% mb-4 rounded bg-gray-700 placeholder-gray-500"
    />
  );
}

export default FilterInput;