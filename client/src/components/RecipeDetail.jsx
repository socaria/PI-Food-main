import React from "react";
import { getRecipeDetail } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './recipeDetail.css';
import img from '../image/04.jpg';
import RecipeCard from "./RecipeCard";
import SearchBar from "./SearchBar";
import Error from "./Error";


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


const RecipeDetail = (props) => {
    const dispatch = useDispatch();
    let recipeId = props.match.params.id
    React.useEffect(() => {
        ;

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
            {getError ?
                <div>
                    <Error message={getError} />
                    <div>{getError}</div>
                </div>
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
                        {recipeDetail?.instructions?.[0] !== "" && recipeDetail?.instructions?.[0]
                            &&
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
            }
        </div>
    );
};

export default RecipeDetail;