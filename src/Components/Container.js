import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="container mx-auto sm:px-0 md:px-8 lg:px-16">
      {children}
    </div>
  );
};

export default Container;