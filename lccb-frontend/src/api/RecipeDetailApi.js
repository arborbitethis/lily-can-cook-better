import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchRecipeDetail = (recipeId) => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
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
    };

    fetchData();
  }, [recipeId]);

  return { recipeDetails, isLoading, error };
};

export default useFetchRecipeDetail;
