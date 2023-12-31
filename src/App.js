import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage'; 
import Header from './Components/Header/header';
import PartsContext from './Contexts/PartsContext';
import About from './Components/Header/About';
import HowToUse from './Components/Header/HowToUse';

function App() {

  const loadUmamiScript = () => {
    const script = document.createElement('script');
    script.src = "https://umami-production-c71a.up.railway.app/script.js";
    script.async = true;
    script.setAttribute("data-website-id", "7683d393-5808-4460-b179-a8f2a9b0c796");
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadUmamiScript();
  }, []);
  
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

  const [selectedPartsArray, setSelectedPartsArray] = useState(() => {
    const savedParts = localStorage.getItem('selectedParts');
    return savedParts ? JSON.parse(savedParts) : Array(12).fill(null);
  });

  return (
    <Router>
      <PartsContext.Provider value={{ selectedPartsArray, setSelectedPartsArray }}>
        <div className="App h-screen bg-gray-900 text-white overflow-hidden">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage selectedPartsArray={selectedPartsArray} setSelectedPartsArray={setSelectedPartsArray}/>} />
            /<Route path="/about" element={<About />} />
            /<Route path="/HowToUse" element={<HowToUse />} />
          </Routes>
        </div>
      </PartsContext.Provider>
    </Router>
  );
}

export default App;