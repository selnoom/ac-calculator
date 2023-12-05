import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="mx-auto px-4 sm:px-6 md:px-8 xl:max-w-6xl">
      {children}
    </div>
  );
};

export default Container;
