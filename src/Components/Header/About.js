import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1100px] bg-gray-700 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p className="mb-4">
        This site is a personal project to help me learn React and web development, while also making something useful for the Armored Core community.
        Feel free to use this tool and share it around. If you have any feedback, suggestions or found any bugs, please let me know!
      </p>

      <h2 className="text-xl font-bold mb-3">Contact Information</h2>
      <p>
      Reach me at:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Email: nicholas@usp.br</li>
        <li>Discord: moonless6674</li>
        <li>
            <a href="https://www.linkedin.com/in/nicholas-pecanha/" 
            className="text-blue-600 hover:underline"
            target="_blank" 
            rel="noopener noreferrer">
            LinkedIn
            </a>
        </li>
        {/* Other contact methods if available */}
      </ul>

      <h2 className="text-xl font-bold mb-3">Contributing</h2>
      <p>
        If you're interested in contributing to this project, please check out the GitHub repository.
      </p>
      {/* Optionally, provide a link to the GitHub repository */}
      <a href="https://github.com/selnoom/ac-calculator" 
        className="text-blue-600 hover:underline"
        target="_blank" 
        rel="noopener noreferrer">
        AC Builder on GitHub
      </a>
    </div>
  );
}

export default About;
