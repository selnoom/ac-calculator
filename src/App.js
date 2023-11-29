import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';  // Import the HomePage component
import Header from './Components/Header/header';
import PartsContext from './Contexts/PartsContext';
import About from './Components/Header/About';

function App() {
  // eslint-disable-next-line no-useless-escape
  useEffect(() => {
    console.log(`
                                      _____
                                     |     |
                                     | | | |
                                     |_____|
                               ____ ___|_|___ ____
                              ()___)         ()___)
                              // /|           |\\ \\
                             // / |           | \\ \\
                            (___) |___________| (___)
                            (___)   (_______)   (___)
                            (___)     (___)     (___)
                            (___)      |_|      (___)
                            (___)  ___/___\\___   | |
                             | |  |           |  | |
                             | |  |___________| /___\\
                            /___\\  |||     ||| //   \\
                           //   \\\\ |||     ||| \\\\   //
                           \\\\   // |||     |||  \\\\ //
                            \\\\ // ()__)   (__()
                                  ///       \\\\
                                 ///         \\\\
                               _///___     ___\\\\_
                              |_______|   |_______|
  `);
  }, []);

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