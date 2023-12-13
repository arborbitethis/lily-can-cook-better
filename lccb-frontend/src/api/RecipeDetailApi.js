import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRecipeDetail = (recipeId) => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const mockRecipeDetails = {
    "recipe": [
        {
            "id": 1,
            "title": "Pike Place poop",
            "image": "https://example.com/pike-place-chowder.jpg",
            "prep_time": 40,
            "cook_time": 45,
            "servings": 6,
            "description": "A rich and creamy poop chowder inspired by the famous Pike Place Chowder in Seattle."
        }
    ],
    "ingredients": [
        {
            "ingredient_id": 89,
            "recipe_id": 1,
            "ingredient_name": "vegetable broth",
            "quantity": "4 cups"
        },
        {
            "ingredient_id": 90,
            "recipe_id": 1,
            "ingredient_name": "heavy cream",
            "quantity": "1 cup"
        },
        {
            "ingredient_id": 91,
            "recipe_id": 1,
            "ingredient_name": "diced onions",
            "quantity": "1/2 cup"
        },
        {
            "ingredient_id": 92,
            "recipe_id": 1,
            "ingredient_name": "diced celery",
            "quantity": "1/2 cup"
        },
        {
            "ingredient_id": 93,
            "recipe_id": 1,
            "ingredient_name": "diced carrots",
            "quantity": "1/2 cup"
        },
        {
            "ingredient_id": 94,
            "recipe_id": 1,
            "ingredient_name": "diced potatoes",
            "quantity": "1/2 cup"
        },
        {
            "ingredient_id": 95,
            "recipe_id": 1,
            "ingredient_name": "butter",
            "quantity": "1/4 cup"
        },
        {
            "ingredient_id": 96,
            "recipe_id": 1,
            "ingredient_name": "all-purpose flour",
            "quantity": "1/4 cup"
        },
        {
            "ingredient_id": 97,
            "recipe_id": 1,
            "ingredient_name": "salt",
            "quantity": "to taste"
        },
        {
            "ingredient_id": 98,
            "recipe_id": 1,
            "ingredient_name": "pepper",
            "quantity": "to taste"
        },
        {
            "ingredient_id": 99,
            "recipe_id": 1,
            "ingredient_name": "poop",
            "quantity": "1 log"
        }
    ],
    "steps": [
        {
            "step_id": 38,
            "recipe_id": 1,
            "step_number": 1,
            "step_description": "In a large pot, melt butter over medium heat. Add onions, celery, carrots, and potatoes. Cook until softened, about 5 minutes.",
            "step_image": null
        },
        {
            "step_id": 39,
            "recipe_id": 1,
            "step_number": 2,
            "step_description": "Stir in flour and cook for another 2 minutes. Gradually add vegetable broth, stirring constantly.",
            "step_image": null
        },
        {
            "step_id": 40,
            "recipe_id": 1,
            "step_number": 3,
            "step_description": "Add mixed seafood and bring to a simmer. Cook for 20 minutes.",
            "step_image": null
        },
        {
            "step_id": 41,
            "recipe_id": 1,
            "step_number": 4,
            "step_description": "stir in poop",
            "step_image": null
        }
    ]
  }
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      if (process.env.NODE_ENV === 'development') {
        // Return mocked data in development environment
        setRecipeDetails(mockRecipeDetails);
        setIsLoading(false);
      } else {
      try {
        const response = await axios.get(`${process.env.REACT_APP_RECPIE_API_URL}/recipe/${recipeId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setRecipeDetails(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
      }
    };

    fetchData();
  }, [recipeId]);

  return { recipeDetails, isLoading, error };
};

export default useFetchRecipeDetail;
