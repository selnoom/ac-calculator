import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';  // Import the HomePage component
import Header from './Components/Header/header';
import PartsContext from './Contexts/PartsContext';
import About from './Components/Header/About';

function App() {
  const [selectedPartsArray, setSelectedPartsArray] = useState(Array(12).fill(null));

  return (
    <Router>
      <PartsContext.Provider value={{ selectedPartsArray, setSelectedPartsArray }}>
        <div className="App h-screen bg-gray-900 text-white overflow-hidden">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage selectedPartsArray={selectedPartsArray} />} />
            /<Route path="/about" element={<About />} />
            {/* Uncomment and complete these asthe components are created */}
            {/* // <Route path="/contact" element={<ContactPage />} /> */}
            {/* // <Route path="/calculations" element={<CalculationInfoPage />} /> */}
          </Routes>
        </div>
      </PartsContext.Provider>
    </Router>
  );
}

export default App;