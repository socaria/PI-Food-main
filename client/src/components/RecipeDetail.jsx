import React from "react";
import { getRecipeDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
//TODO renderizar tipo de dieta de lo que proviene de base de datos
//TODO agregar ingredientes
const RecipeDetail = (props) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        let recipeId = props.match.params.id;


        dispatch(getRecipeDetail(recipeId));
    },
        [])

    let recipeDetail = useSelector(state => {

        return state.recipeDetail

    })
//TODO ver paso a paso y resumen, opciones de renderizado con html
    return (
        <div>
            <h2>{recipeDetail?.title}</h2>
            <img src={recipeDetail?.image} alt='Img not found' />
            <h4>Resumen: {recipeDetail?.summary}</h4>
            <h4>Paso a paso: {recipeDetail?.instructions}</h4>
            <h4>Nivel de comida saludable: {recipeDetail?.healthScore}</h4>
            <h4>Tipo de dieta:</h4>
            <ul>
                {recipeDetail?.diets?.map(d => {
                return (
                    <li key={d}>{d}</li>)
                })}
            </ul>
            <h4>Tipo de plato: {recipeDetail?.dishTypes}</h4>
            <Link to='/home'>Volver</Link>
        </div>
    );
};

export default RecipeDetail;
