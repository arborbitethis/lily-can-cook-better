import { useState, useEffect } from 'react';
import axios from 'axios';

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_RECPIE_API_URL}/recipes`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setRecipes(response.data);
        setIsLoading(false);

      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { recipes, isLoading, error };
};

export default useRecipes;
