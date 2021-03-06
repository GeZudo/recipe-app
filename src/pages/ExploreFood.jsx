import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ExploreFood() {
  const [randomMealRecipeId, setRandomMealRecipeId] = useState();

  useEffect(() => {
    const getRandomMealRecipe = async () => {
      await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then(({ meals }) => setRandomMealRecipeId(meals[0].idMeal));
    };
    getRandomMealRecipe();
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" enable={ false } />
      <div>
        <div className="buttons">
          <Link to="/explorar/comidas/ingredientes">
            <button
              type="button"
              name="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button
              type="button"
              name="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
          <Link to={ `/comidas/${randomMealRecipeId}` }>
            <button
              type="button"
              name="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>
      </div>
      <Footer fixed />
    </div>
  );
}
