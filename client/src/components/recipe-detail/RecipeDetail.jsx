import React from "react";
import { getRecipeDetail } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import './recipeDetail.css';
import img from '../../image/04.jpg';
import SearchBar from "../search-bar/SearchBar";
import Message from "../message/Message"



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


const RecipeDetail = (props) => {
    const dispatch = useDispatch();
    let recipeId = props.match.params.id
    React.useEffect(() => {

        dispatch(getRecipeDetail(recipeId));
    }, [])

    let recipeDetail = useSelector(state => {

        return state.recipeDetail

    })
    let errorMessage = useSelector(state => {

        return state.errorMessage

    })
    console.log("🚀 ~ file: RecipeDetail.jsx ~ line 36 ~ errorMessage ~ errorMessage", errorMessage)


    return (
        <>
            <SearchBar />
            {errorMessage ?
                <Message message={errorMessage} type="error" />
                :
                <div className="recipe-detail__container">
                    <h2 className="titleh2">{recipeDetail?.title && capitalizeFirstLetter(recipeDetail?.title)}</h2>
                    <div className="recipe-detail__image">
                        <img src={recipeDetail?.image || img}
                            alt="recipe image"
                            className="image__src"
                        />
                        <p className="image__health-score">{recipeDetail.healthScore}</p>
                    </div>
                    <div className="create-recipe__div">
                        <h3 className="titleh3">Summary</h3>
                        <p className="recipe-detail__summary" dangerouslySetInnerHTML={{ __html: recipeDetail?.summary && capitalizeFirstLetter(recipeDetail?.summary) }}></p>
                    </div>
                    {console.log(recipeDetail?.instructions?.[0])}
                    {recipeDetail?.instructions?.[0] && recipeDetail?.instructions?.[0] !== "" &&
                        <div className="create-recipe__div">
                            <h3 className="titleh3">Steps</h3>
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
                    <div className="recipe-detail__div">
                        {
                            recipeDetail?.diets?.length > 0 &&
                            <h3 className="titleh3">Diet</h3> 
                        }
                        <ul className="recipe-detail__diet">
                            {recipeDetail?.diets?.map(d => {
                                return (
                                    <label
                                        key={d.name}
                                        className="diet__label"
                                    >
                                        {d.name}
                                    </label>)
                            })}
                        </ul>
                    </div>
                    {recipeDetail.dishTypes &&
                        <div className="recipe-detail__div">
                            <h3 className="titleh3">Dish type</h3>
                            <label className="diet__label">{recipeDetail.dishTypes}</label>
                        </div>}
                </div>
            }
        </>
    );
};
export default RecipeDetail;