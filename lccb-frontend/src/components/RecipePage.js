import React, { useState } from 'react';
import RecipeCard from './recipe-page-components/RecipeCard';
import RecipeDetail from './recipe-page-components/RecipeDetail';
import Filters from './recipe-page-components/Filters';
import useRecipes from '../api/RecipeApi';

const RecipePage = () => {
  const { recipes, isLoading, error } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [totalTime, setTotalTime] = useState(80);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = recipes.filter(recipe => {
    const calculatedTotalTime = recipe.prepTime + recipe.cookTime;
    return (
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      calculatedTotalTime <= totalTime
    );
  });

  return (
    <div className="container mx-auto p-4">
      {!selectedRecipe && (
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          totalTime={totalTime}
          setTotalTime={setTotalTime}
        />
      )}
      {isLoading ? (
        <div className="text-center text-lg text-gray-600 my-4">Loading...</div>
      ) : error ? (
        <div className="text-center text-lg text-gray-500 my-4">Error: {error.message}</div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center text-lg text-gray-500 my-4">No recipes match the current filter criteria.</div>
      ) : selectedRecipe ? (
        <RecipeDetail
          recipeId={selectedRecipe.id}
          onBack={() => setSelectedRecipe(null)}
        />
      ) : (
        <div className="flex flex-wrap justify-center mt-5">
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              className="w-full sm:w-320px mr-4 mb-4 cursor-pointer" // Adjust width for mobile screens
              title={recipe.title}
              description={recipe.description}
              prepTime={recipe.prepTime}
              cookTime={recipe.cookTime}
              servings={recipe.servings}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default RecipePage;
