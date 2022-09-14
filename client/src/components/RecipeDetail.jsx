import React from "react";
import { getRecipeDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './recipeDetail.css';

//TODO renderizar tipo de dieta de lo que proviene de base de datos
//TODO agregar ingredientes
const RecipeDetail = (props) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        let recipeId = props.match.params.id;

        dispatch(getRecipeDetail(recipeId));
    }, [])

    let recipeDetail = useSelector(state => {

        return state.recipeDetail

    })
    console.log("🚀 ~ file: RecipeDetail.jsx ~ line 22 ~ recipeDetail ~ recipeDetail", recipeDetail)
    //TODO ver paso a paso y resumen, opciones de renderizado con html
    return (
        <div>
            <h2 className="titleh2">{recipeDetail?.title}</h2>
            <img src={recipeDetail?.image} alt='Img not found' />
            <div className="div">
                <h3 className="titleh3">Resumen: </h3>
                <p dangerouslySetInnerHTML={{ __html: recipeDetail?.summary }}></p>
            </div>
            <div className="div">
                <h3 className="titleh3">Paso a paso:</h3>
                <div>
                    {recipeDetail?.instructions?.[0].map(i => {
                        return (
                            <div key={i.description}>
                                <h4>Paso n° {i.step}</h4>
                                <p>{i.description}</p>
                            </div>)
                    })}
                </div>
            </div>
            <div className="div">
                <h3 className="titleh3">Nivel de comida saludable:</h3>
                <p>{recipeDetail?.healthScore}</p>
            </div>
            <div className="div">
                <h3 className="titleh3">Tipo de dieta:</h3>
                <ul>
                    {recipeDetail?.diets?.map(d => {
                        return (
                            <li key={d.name}>{d.name}</li>)
                    })}
                </ul>
            </div>
            <div className="div">
                <h3 className="titleh3">Tipo de plato: </h3>
                <p>{recipeDetail?.dishTypes}</p>
            </div>
            <Link to='/home'>Volver</Link>
        </div>
    );
};

export default RecipeDetail;
