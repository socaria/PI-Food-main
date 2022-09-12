import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = (props) => {

  return (
    <div>
      <img src={props.image} alt={props.title}/>
      <h3>
        <Link to={`/recipes/${props.id}`}>
          {props.title}
        </Link>
      </h3>
      <p>Tipo de dieta: 
      <ul>{props.diets?.map(d => {
        return( 
          <li key={d}>{d}</li>)
          })}
      </ul>
      </p>
      

    </div>
  );
};


export default RecipeCard;