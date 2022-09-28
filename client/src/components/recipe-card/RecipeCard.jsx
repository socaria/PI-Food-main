import React from "react";
import { Link } from "react-router-dom";
import "../recipe-card/recipeCard.css";
import img from '../../image/04.jpg';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const RecipeCard = (props) => {

  return (
    <div className="recipe-card__container">
      <Link to={`/recipes/${props.id}`}>
        <div className="recipe-card__image-container">
          <img
            src={props?.image || img}
            alt={props?.title}
            className="recipe-card__image"
          />
          {props.healthScore < 50 && <p title="Health Score" className="recipe-card__HS recipe-card__HS--bad">
            {props.healthScore}
          </p>}
          {props.healthScore < 70 && <p title="Health Score" className="recipe-card__HS recipe-card__HS--regular">
            {props.healthScore}
          </p>}
          {props.healthScore >= 70 && <p title="Health Score" className="recipe-card__HS recipe-card__HS--good">
            {props.healthScore}
          </p>}
        </div>
        <h3 className="recipe-card__title" title={props.title}>

          {props.title && capitalizeFirstLetter(props.title)}

        </h3>
      </Link>
      <div className="recipe-card__diets">
        {
          props.diets?.map((d, index) => (
            <label className="recipe-card__diet-label" key={d.name + '_' + index}>{d.name}</label>
          ))
        }

      </div>
      <br></br>
    </div >
  );
};


export default RecipeCard;