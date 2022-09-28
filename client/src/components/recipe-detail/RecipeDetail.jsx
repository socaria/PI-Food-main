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

    return (
        <>
            <SearchBar />
            {errorMessage ?
                <Message message={errorMessage} type="error" />
                :
                <div className="recipe-detail__container">
                    <h2 className="recipe-detail__recipe-title">{recipeDetail?.title && capitalizeFirstLetter(recipeDetail?.title)}</h2>
                    <div className="recipe-detail__image">
                        <img src={recipeDetail?.image || img}
                            alt="recipe image"
                            className="image__src"
                        />
                        {recipeDetail.healthScore < 50 && <p title="Health Score" className="image__health-score image__health-score--bad">
                            {recipeDetail.healthScore}
                        </p>}
                        {recipeDetail.healthScore < 70 && recipeDetail.healthScore >= 50 && <p title="Health Score" className="image__health-score image__health-score--regular">
                            {recipeDetail.healthScore}
                        </p>}
                        {recipeDetail.healthScore >= 70 && <p title="Health Score" className="image__health-score image__health-score--good">
                            {recipeDetail.healthScore}
                        </p>}
                    </div>
                    <div className="create-recipe__div">
                        <h3 className="recipe-detail__title">Summary</h3>
                        <p className="recipe-detail__summary" dangerouslySetInnerHTML={{
                            __html: recipeDetail?.summary && capitalizeFirstLetter(recipeDetail?.summary.replaceAll(new RegExp(/<(?:a\b[^>]*>|\/a>)/g), ""))
                        }}></p>
                    </div>
                    {recipeDetail?.instructions?.[0] && recipeDetail?.instructions?.[0] !== "" &&
                        <div className="create-recipe__div">
                            <h3 className="recipe-detail__title">Steps</h3>
                            <div>
                                {
                                    recipeDetail?.instructions?.filter(instruction => instruction !== "")
                                        .map((instruction, index) => {
                                            return (
                                                <div key={instruction}>
                                                    <h4>Step n° {index + 1}</h4>
                                                    <p>{capitalizeFirstLetter(instruction)}</p>
                                                </div>)
                                        })}
                            </div>

                        </div>
                    }
                    <div className="recipe-detail__div">
                        {
                            recipeDetail?.diets?.length > 0 &&
                            <h3 className="recipe-detail__title">Diet</h3>
                        }
                        <ul className="recipe-detail__diet">
                            {recipeDetail?.diets?.map(d => {
                                return (
                                    <label
                                        key={d.name}
                                        className="recipe-detail__diet-label"
                                    >
                                        {d.name}
                                    </label>)
                            })}
                        </ul>
                    </div>
                    {recipeDetail.dishTypes &&
                        <div className="recipe-detail__div">
                            <h3 className="recipe-detail__title">Dish type</h3>
                            <label className="recipe-detail__diet-label">{recipeDetail.dishTypes}</label>
                        </div>}
                </div>
            }
        </>
    );
};
export default RecipeDetail;