"use client";

import React, { useState, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';

function App() {
  const [text, setText] = useState('Hello World!');

  // Simulating text change after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setText('Welcome to the React typing animation!');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1>
        {/* Add key prop to trigger re-render and reset animation */}
        <TypeAnimation
          key={text} // This ensures the animation resets when text changes
          sequence={[
            '', // Clear the previous text
            500, // Wait for 500ms
            text, // Type the new text from state
            1000, // Wait after typing the new text
          ]}
          wrapper="span"
          speed={50} // Typing speed
          cursor={true} // Show cursor
          deleteSpeed={50} // Speed of deleting the old text
        />
      </h1>
    </div>
  );
}

export default App;
