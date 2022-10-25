import React from "react";
import { getRecipeDetail, deleteRecipe, editRecipe } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import './recipeDetail.css';
import img from '../../image/04.jpg';
import SearchBar from "../search-bar/SearchBar";
import Message from "../message/Message"
import { useHistory } from "react-router-dom";



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


const RecipeDetail = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    let recipeId = props.match.params.id

    React.useEffect(() => {

        dispatch(getRecipeDetail(recipeId));
    }, [dispatch])

    let recipeDetail = useSelector(state => {

        return state.recipeDetail

    })
    let errorMessage = useSelector(state => {

        return state.errorMessage

    })

    const handleEdit = (recipeId) => {
        history.push(`/recipes/edit/${recipeId}`);
    }

    const handleDelete = (recipeId) => {
        if (window.confirm("Do you really want to detele this recipe?")){
        dispatch(deleteRecipe(recipeId));
        alert('The recipe was deleted successfully!');
        history.push('/home');}
    }

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
                    {recipeDetail.createdInDb &&
                        <div className="recipe-detail__div-button">
                            <button className="recipe-detail__button" onClick={() => handleEdit(recipeId)}>
                                <svg fill='rgba(30,103,247,255)' viewBox="0 0 20 20" width="16px" height="16px"><path d="M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zM5 18h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 0 0-.07-2.71L16.66 2.6A2 2 0 0 0 14 2.53l-9 9a2 2 0 0 0-.57 1.21L4 16.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 18zM15.27 4 18 6.73l-2 1.95L13.32 6zm-8.9 8.91L12 7.32l2.7 2.7-5.6 5.6-3 .28z" data-name="edit-2" /> </svg>
                            </button>
                            <button className="recipe-detail__button" type='button' onClick={() => { handleDelete(recipeId) }}>
                                <svg fill="rgba(30,103,247,255)" viewBox="0 0 128 128" width="16px" height="16px"><path d="M 49 1 C 47.34 1 46 2.34 46 4 C 46 5.66 47.34 7 49 7 L 79 7 C 80.66 7 82 5.66 82 4 C 82 2.34 80.66 1 79 1 L 49 1 z M 24 15 C 16.83 15 11 20.83 11 28 C 11 35.17 16.83 41 24 41 L 101 41 L 101 104 C 101 113.37 93.37 121 84 121 L 44 121 C 34.63 121 27 113.37 27 104 L 27 52 C 27 50.34 25.66 49 24 49 C 22.34 49 21 50.34 21 52 L 21 104 C 21 116.68 31.32 127 44 127 L 84 127 C 96.68 127 107 116.68 107 104 L 107 40.640625 C 112.72 39.280625 117 34.14 117 28 C 117 20.83 111.17 15 104 15 L 24 15 z M 24 21 L 104 21 C 107.86 21 111 24.14 111 28 C 111 31.86 107.86 35 104 35 L 24 35 C 20.14 35 17 31.86 17 28 C 17 24.14 20.14 21 24 21 z M 50 55 C 48.34 55 47 56.34 47 58 L 47 104 C 47 105.66 48.34 107 50 107 C 51.66 107 53 105.66 53 104 L 53 58 C 53 56.34 51.66 55 50 55 z M 78 55 C 76.34 55 75 56.34 75 58 L 75 104 C 75 105.66 76.34 107 78 107 C 79.66 107 81 105.66 81 104 L 81 58 C 81 56.34 79.66 55 78 55 z" /></svg>
                            </button>
                        </div>}
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