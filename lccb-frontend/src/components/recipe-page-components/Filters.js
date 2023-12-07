import React from 'react';

const Filters = ({ setSearchTerm, searchTerm, setTotalTime, totalTime }) => {
  return (
    <div className="flex flex-col px-8 bg-gray-200 shadow-md mx-20 mt-6">
      <div className="flex justify-around  ">
        <div className="flex flex-col items-center">
          <label htmlFor="search" className="font-bold mb-2 text-lg text-gray-700 text-center">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search Recipe"
            className="p-2 w-60"
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="totalTime" className="font-bold mb-2 text-lg text-gray-700 text-center">
            Total Time (Prep + Cook) 
          </label>
          <input
            type="range"
            min="0"
            max="240"
            step="5"
            defaultValue="120"
            id="totalTime"
            className="w-60"
            onChange={(e) => {
              setTotalTime(e.target.value);
              document.getElementById('sliderValue').innerText = e.target.value;
            }}
          />
          <label htmlFor="totalTime" className="font-bold mb-2 text-lg text-gray-700 text-center">
            <span id="sliderValue">{totalTime}</span> minutes or less
          </label>
        </div>

      </div>
    </div>
  );
};

export default Filters;
