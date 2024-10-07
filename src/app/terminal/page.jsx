"use client"
import React, { useState } from "react";
import axios from "axios"; // Or use fetch API

const Terminal = () => {
  const [codeInput, setCodeInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConvertAndRun = async () => {
    setIsLoading(true);
    try {
      // Send request to Gemini API
      const response = await axios.post(process.env.GEMINI_API_KEY, {
        code: codeInput,
      });
      
      // Assuming the API response has an output field
      const result = response.data.output;
      setOutput(result);
    } catch (error) {
      setOutput("Error in fetching code output.");
    }
    setIsLoading(false);
  };

  return (
    <div className="terminal-container bg-gray-900 text-white p-4 rounded-lg">
      <textarea
        className="code-input bg-gray-800 text-white w-full p-2"
        rows="6"
        placeholder="Enter your code here..."
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
      />
      <button
        onClick={handleConvertAndRun}
        className="run-button mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        {isLoading ? "Running..." : "Convert & Run"}
      </button>

      <div className="output-section mt-4 bg-black p-4 rounded-lg">
        <h3 className="text-lg font-bold">Output:</h3>
        <pre>{output ? output : "Output will appear here..."}</pre>
      </div>
    </div>
  );
};

export default Terminal;
