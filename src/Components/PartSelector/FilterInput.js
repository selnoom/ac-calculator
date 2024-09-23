import React from 'react';

function FilterInput({ value, onChange, placeholder = "Filter parts..." }) {
  return (
    <input 
      type="text" 
      placeholder={placeholder} 
      value={value}
      onChange={onChange}
      className="p-2 mb-4 bg-gray-700 placeholder-gray-500 flex-center w-full outline-none focus:border-blue-500"
      autoFocus
    />
  );
}

export default FilterInput;