import React from "react";
import { getRecipeDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './recipeDetail.css';
import img from '../image/04.jpg';
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";

//TODO agregar ingredientes
//TODO si no existe ID pasado por query, debería retornar error

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const RecipeDetail = (props) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        let recipeId = props.match.params.id;

        dispatch(getRecipeDetail(recipeId));
    }, [])

    let recipeDetail = useSelector(state => {

        return state.recipeDetail

    })
    let getError = useSelector(state => {

        return state.getError

    })


    return (
        <div>
            <SearchBar />
            getError ?
            <p>
                {getError}</p>
            :
            <div>
                <div className="recipe-detail__div">
                    <RecipeCard
                        title={recipeDetail?.title && capitalizeFirstLetter(recipeDetail?.title)}
                        image={recipeDetail?.image || img}
                        diets={recipeDetail?.diets}
                        id={recipeDetail?.id}
                        healthScore={recipeDetail?.healthScore}
                    />
                    <div className="create-recipe__div">
                        <h3 className="recipe-detail__summary">Summary: </h3>
                        <p dangerouslySetInnerHTML={{ __html: recipeDetail?.summary && capitalizeFirstLetter(recipeDetail?.summary) }}></p>
                    </div>
                </div>
                <div>
                    {recipeDetail?.instructions?.[0] !== "" &&
                        <div className="create-recipe__div">
                            <h3 className="titleh3">Steps:</h3>
                            <div>
                                {
                                    recipeDetail?.instructions?.map((instruction, index) => {
                                        return (
                                            <div key={instruction}>
                                                <h4>Step n° {index + 1}</h4>
                                                <p>{instruction && capitalizeFirstLetter(instruction)}</p>
                                            </div>)
                                    })}
                            </div>

                        </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default RecipeDetail;
// <div>
        // <div className="recipe-detail__container">
        //     <h2 className="titleh2">{recipeDetail?.title && capitalizeFirstLetter(recipeDetail?.title)}</h2>
        //     {
        //         <img
        //             src={recipeDetail?.image || img}
        //             alt="recipe image"
        //             className="recipe-detail__image"
        //         />
        //     }

        //     <div className="create-recipe__div">
        //         <h3 className="titleh3">Resumen: </h3>
        //         <p dangerouslySetInnerHTML={{ __html: recipeDetail?.summary && capitalizeFirstLetter(recipeDetail?.summary) }}></p>
        //     </div>
        //     {recipeDetail?.instructions?.[0] !== "" &&
        //         <div className="create-recipe__div">
        //             <h3 className="titleh3">Steps:</h3>
        //             <div>
        //                 {
        //                     recipeDetail?.instructions?.map((instruction, index) => {
        //                         return (
        //                             <div key={instruction}>
        //                                 <h4>Step n° {index + 1}</h4>
        //                                 <p>{instruction && capitalizeFirstLetter(instruction)}</p>
        //                             </div>)
        //                     })}
        //             </div>

        //         </div>
        //     }
        //     <div className="create-recipe__div">
        //         <h3 className="titleh3">Health score:</h3>
        //         <p>{recipeDetail?.healthScore}</p>
        //     </div>
        //     <div className="create-recipe__div">
        //         {
        //             recipeDetail?.diets?.length > 0 &&
        //             <h3 className="titleh3">Diet: </h3>

        //         }
        //         <ul>
        //             {recipeDetail?.diets?.map(d => {
        //                 return (
        //                     <button
        //                         key={d.name}
        //                         className="recipe-detail__diet-button"
        //                     >
        //                         {d.name}
        //                     </button>)
        //             })}
        //         </ul>
        //     </div>
        //     {recipeDetail.dishTypes &&
        //         <div className="create-recipe__div">
        //             <h3 className="titleh3">Dish type: </h3>
        //             <button className="recipe-detail__diet-button">{recipeDetail.dishTypes}</button>
        //         </div>}
        //     <Link to='/home'>Home</Link>
        // </div>