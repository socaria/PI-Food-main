import {
    GET_RECIPES,
    GET_ERROR,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    SORT_BY_HEALTH_SCORE,
    SORT_BY_TITLE,
    FILTER_BY_DIET,
    SORT
} from './actions_type';
import axios from 'axios';

export function getRecipes(title) {
    let url = 'http://localhost:3001/recipes';

    if (title) {
        url += `?title=${title}`
    }
    return async function (dispatch) {
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            dispatch({ type: GET_RECIPES, payload: json });
        } else {
            dispatch({ type: GET_ERROR, payload: 'There are no recipes with that name' });
        }
    }
}


export function getRecipeDetail(id) {
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/recipes/${id}`);
        if (response.ok) {
            const json = await response.json();
            dispatch({ type: GET_RECIPE_DETAIL, payload: json });
        } else {
            dispatch({ type: GET_ERROR, payload: 'There are no recipes with that ID' });
        }
    }
}


export function createRecipe(input) {
    return async function () {
        const resRecipe = await axios.post(`http://localhost:3001/recipes`, input);
        return resRecipe;
    }
}


export function getDiets() {
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/diets`);
        const json = await response.json();
        dispatch({ type: GET_DIETS, payload: json });
    }
}

export function filterByDiet(diet) {
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/recipes/filter/${diet}`);
        const json = await response.json();
        dispatch({ type: FILTER_BY_DIET, payload: json });
    }
}

export function sortBy(payload) {
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/recipes/sort/${payload}`);
        const json = await response.json();
        dispatch({ type: SORT, payload: json });
    }
}

// export function sortByTitle(payload) {
//     return {
//         type: SORT_BY_TITLE,
//         payload
//     }
// }

// export function sortByHealthScore(payload) {
//     return {
//         type: SORT_BY_HEALTH_SCORE,
//         payload
//     }
// }