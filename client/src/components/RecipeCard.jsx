import React from "react";
import { Link } from "react-router-dom";
import "./recipeCard.css";

const RecipeCard = (props) => {

  return (
    <div className="card">
      <img src={props.image} alt={props.title} />
      <h3>
        <Link callsName="card-title" to={`/recipes/${props.id}`}>
          {props.title}
        </Link>
      </h3>
      <div>
        <p>Tipo de dieta:</p>
        <ul>
          {
            props.diets?.map(d => (
              <li key={d.name}>{d.name}</li>
            ))
          }
        </ul>
      </div>


    </div>
  );
};


export default RecipeCard;