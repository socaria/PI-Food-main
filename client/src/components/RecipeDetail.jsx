import React from "react";
import { getRecipeDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './recipeDetail.css';
import img from '../image/04.jpg'


//TODO agregar ingredientes
//TODO si no existe ID pasado por query, debería retornar error
const RecipeDetail = (props) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        let recipeId = props.match.params.id;

        dispatch(getRecipeDetail(recipeId));
    }, [])

    let recipeDetail = useSelector(state => {

        return state.recipeDetail

    })
    

    return (
        typeof recipeDetail === 'string'
            ? <p>
            There are no recipes with that ID</p>
            :
            <div className="recipe-detail__container">
                <h2 className="titleh2">{recipeDetail?.title}</h2>
                {
                    <img
                        src={recipeDetail?.image || img}
                        alt="recipe image"
                        className="recipe-detail__image"
                    />
                }

                <div className="create-recipe__div">
                    <h3 className="titleh3">Resumen: </h3>
                    <p dangerouslySetInnerHTML={{ __html: recipeDetail?.summary }}></p>
                </div>
                {recipeDetail?.instructions?.[0] !== "" &&
                    <div className="create-recipe__div">
                        <h3 className="titleh3">Steps:</h3>
                        <div>
                            {
                                recipeDetail?.instructions?.map((instruction, index) => {
                                    return (
                                        <div key={instruction}>
                                            <h4>Step n° {index + 1}</h4>
                                            <p>{instruction}</p>
                                        </div>)
                                })}
                        </div>

                    </div>
                }
                <div className="create-recipe__div">
                    <h3 className="titleh3">Health score:</h3>
                    <p>{recipeDetail?.healthScore}</p>
                </div>
                <div className="create-recipe__div">
                    {
                        recipeDetail?.diets?.length > 0 &&
                        <h3 className="titleh3">Diet: </h3>

                    }
                    <ul>
                        {recipeDetail?.diets?.map(d => {
                            return (
                                <button
                                    key={d.name}
                                    className="recipe-detail__diet-button"
                                >
                                    {d.name}
                                </button>)
                        })}
                    </ul>
                </div>
                {recipeDetail.dishTypes &&
                    <div className="create-recipe__div">
                        <h3 className="titleh3">Dish type: </h3>
                        <p>{recipeDetail.dishTypes}</p>
                    </div>}
                <Link to='/home'>Home</Link>
            </div>
    
        );
};

export default RecipeDetail;
