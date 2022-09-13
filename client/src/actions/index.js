import {
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    CREATE_RECIPE,
    GET_DIETS,
    SORT_BY_HEALTH_SCORE,
    SORT_BY_TITLE,
    FILTER_BY_DIET
} from './actions_type';
import axios from 'axios';

export function getRecipes(title) {
    let url = 'http://localhost:3001/recipes';

    if (title) {
        url += `?title=${title}`
    }
    return async function (dispatch) {
        const response = await fetch(url);
        const json = await response.json();
        dispatch({ type: GET_RECIPES, payload: json });
    }
}



export function getRecipeDetail(id) {
    return async function (dispatch) {
        const res = await fetch(`http://localhost:3001/recipes/${id}`);
        const obj = await res.json();

        return dispatch({
            type: GET_RECIPE_DETAIL,
            payload: obj
        });
    }
}

//TODO agregar imput de dietas
export function createRecipe(input) {
    return async function (dispatch) {
        const res = await axios.post(`http://localhost:3001/recipes`,input);
        return res;
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
        return {
            type: FILTER_BY_DIET,
            payload: diet
        }
    }

    export function sortByTitle(payload) {
        return {
            type: SORT_BY_TITLE,
            payload
        }
    }

    export function sortByHealthScore(payload) {
        return {
            type: SORT_BY_HEALTH_SCORE,
            payload
        }
    }