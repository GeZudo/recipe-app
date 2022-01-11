import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getIngredients } from '../services';
import MyContext from '../context/MyContext';

export default function IngredientCard({ page, strIngredient, strIngredient1 }) {
  const { setFilter, setIngredients, setIngredient } = useContext(MyContext);

  const filterByIngredient = async () => {
    const ingredient = page === 'comidas' ? strIngredient : strIngredient1;
    const ingredients = await getIngredients(page);
    setFilter(ingredient);
    setIngredients(ingredients);
  };

  useEffect(() => {
    filterByIngredient();
  }, []);

  let image = '';
  if (page === 'comidas') {
    image = `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`;
  } else {
    image = `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;
  }

  const handleIngredient = () => {
    setIngredient((strIngredient || strIngredient1));
  };

  return (
    <Link
      onClick={ handleIngredient }
      to={ page === 'comidas' ? '/comidas' : '/bebidas' }
      className="recipe-card-wrap"
    >
      <div className="recipe-card explore">
        <img
          src={ image }
          alt={ `${strIngredient} img` }
        />
        <h4>
          { page === 'comidas' ? strIngredient : strIngredient1 }
        </h4>
      </div>
    </Link>
  );
}

IngredientCard.propTypes = {
  page: PropTypes.string.isRequired,
  strIngredient: PropTypes.string.isRequired,
  strIngredient1: PropTypes.string.isRequired,
};
