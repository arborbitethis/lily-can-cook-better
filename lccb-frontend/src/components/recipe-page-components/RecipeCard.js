import React from 'react';

const RecipeCard = ({ className, title, description, prepTime, cookTime, servings, onClick }) => {
  const totalTime = prepTime + cookTime;

  return (
    <div 
      onClick={onClick}  
      className={`${className ? className + ' ' : ''}bg-white rounded-lg p-5 w-1/3 box-border text-center transition-transform transition-shadow duration-200 ease-in shadow-md hover:-translate-y-1 hover:shadow-xl border border-gray-300 md:w-1/2 max-w-sm sm:w-full`}
    >
      <h2 className="text-xl text-gray-700 mb-2">{title}</h2>
      <p className="text-gray-500 mb-2">{description}</p>
      <p className="text-gray-500 mb-2">Total Time: {totalTime} mins</p>
      <p className="text-gray-500 mb-2">Servings: {servings}</p>
    </div>
  );
};

export default RecipeCard;
