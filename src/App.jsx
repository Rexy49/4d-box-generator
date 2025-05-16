import React, { useState } from "react";

function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-700 to-blue-800 text-white p-6 shadow-md">
      <h1 className="text-4xl font-bold text-center">4D Winning Box Forecast</h1>
      <p className="text-center text-base mt-2">Generate 4D numbers from your box input</p>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm py-4 border-t mt-8">
      &copy; {new Date().getFullYear()} 4D Number Generator. All rights reserved.
    </footer>
  );
}

function Navigation() {
  return (
    <nav className="bg-white border-b shadow-sm py-2 px-6 flex justify-between">
      <div className="font-semibold text-blue-700">4D Generator</div>
      <div className="text-sm text-gray-600">v1.0</div>
    </nav>
  );
}

function FourDBoxGenerator() {
  const [matrix, setMatrix] = useState(Array(4).fill().map(() => Array(4).fill("")));
  const [combinations, setCombinations] = useState([]);

  const handleChange = (row, col, value) => {
    const newMatrix = matrix.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? value : c))
    );
    setMatrix(newMatrix);
  };

  const generateCombinations = () => {
    if (matrix.some(row => row.some(cell => cell === ""))) {
      alert("Please fill in all cells before generating combinations.");
      return;
    }

    const combos = [];
    for (let a = 0; a < 4; a++) {
      for (let b = 0; b < 4; b++) {
        for (let c = 0; c < 4; c++) {
          for (let d = 0; d < 4; d++) {
            combos.push(`${matrix[0][a]}${matrix[1][b]}${matrix[2][c]}${matrix[3][d]}`);
          }
        }
      }
    }
    setCombinations(combos);
  };

  const exportToFile = () => {
    const blob = new Blob([combinations.join("\n")], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '4d_combinations.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        4D Combination Generator
      </h2>
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold mb-3 text-blue-800">🎯 Input Your 4x4 Box</h3>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {matrix.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  maxLength={1}
                  className="w-16 h-16 text-center border border-gray-400 rounded-lg text-xl"
                  value={matrix[rowIndex][colIndex]}
                  onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                />
              ))
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3 text-green-800">🎲 Generated Numbers</h3>
          <div className="flex gap-4 mb-4">
            <button
              onClick={generateCombinations}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Generate 256 Numbers
            </button>
            {combinations.length > 0 && (
              <button
                onClick={exportToFile}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                Export to File
              </button>
            )}
          </div>
          {combinations.length > 0 && (
            <div className="grid grid-cols-4 gap-2 text-sm max-h-[500px] overflow-y-scroll pr-2">
              {combinations.map((combo, idx) => (
                <div key={idx} className="p-2 border border-gray-300 rounded text-center bg-white shadow-sm">
                  {combo}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <Header />
      <FourDBoxGenerator />
      <Footer />
    </div>
  );
}
