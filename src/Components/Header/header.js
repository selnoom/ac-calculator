import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-gray-800 text-white w-full fixed top-0 left-0 z-10 shadow-md">
      <nav className="container mx-auto px-4 sm:px-6 md:px-8 py-3 flex justify-start items-center h-full">
        {/* Centered Navigation Menu */}
        <ul className="flex items-center">
          <li className="mr-6">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          </li>
          <li className="mr-6">
            <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          </li>
          {/* <li className="mr-6">
            <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
          </li> */}
          {/* <li className="mr-6">
            <Link to="/calculations" className="text-white hover:text-gray-300">Calculations</Link>
          </li> */}
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
