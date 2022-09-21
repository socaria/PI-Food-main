import React from "react";
import { Link } from "react-router-dom";
import "./recipeCard.css";
import img from '../image/04.jpg';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const RecipeCard = (props) => {

  return (
    <div className="recipe-card__container">
      <div className="recipe-card__image-container">
        <img
          src={props?.image || img}
          alt={props?.title}
          className="recipe-card__image"
        />
        <div className="recipe-card__HS">{props.healthScore}</div>
      </div>
      <h3>
        <Link className="recipe-card__title" to={`/recipes/${props.id}`}>
          {capitalizeFirstLetter(props.title)}
        </Link>
      </h3>
      <div>
        
        <div>
          {
            props.diets?.map(d => (
              <button key={d.name}>{d.name}</button>
            ))
          }
        </div>
      </div>
      <br></br>
    </div>
  );
};


export default RecipeCard;