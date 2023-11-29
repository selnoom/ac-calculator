import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container';

function Header() {
  return (
    <header className="bg-gray-800 text-white w-full fixed top-0 left-0 z-10 shadow-md">
      <Container> {/* Use the Container component */}
        <nav className="py-3 flex justify-start items-center h-full">
          <ul className="flex items-center">
            <li className="mr-6">
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li className="mr-6">
              <Link to="/about" className="text-white hover:text-gray-300">About</Link>
            </li>
            {/* Additional links */}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;