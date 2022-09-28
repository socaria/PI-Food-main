import {
    GET_RECIPES,
    REQUEST_ERROR,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    CURRENT_PAGE
} from './actions_type';
import axios from 'axios';

export function getRecipes(queryParams) {
    let url = new URL('http://localhost:3001/recipes');
    if (queryParams?.title) {
        url.searchParams.append("title", queryParams?.title);
    }

    if (queryParams?.diet) {
        url.searchParams.append("diet", queryParams?.diet);

    }

    if (queryParams?.sortBy) {
        url.searchParams.append("sortBy", queryParams?.sortBy);

    }


    return async function (dispatch) {
        const response = await fetch(url);

        if (response.ok) {
            const json = await response.json();
            dispatch({ type: GET_RECIPES, payload: json, query: queryParams });
        } else {
            dispatch({ type: REQUEST_ERROR, payload: 'There are no recipes with that name' });
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
            dispatch({ type: REQUEST_ERROR, payload: 'There are no recipes with that ID' });
        }
    }
}
export function createRecipe(input) {
    return async function () {
        const resRecipe = await axios.post(`http://localhost:3001/recipes`, input);
        return resRecipe;
    }
}

export function getCurrentPage(pageNumber) {
    return {
        type: CURRENT_PAGE,
        payload: pageNumber
    }
}

export function getDiets() {
    return async function (dispatch) {
        const response = await fetch(`http://localhost:3001/diets`);
        const json = await response.json();
        dispatch({ type: GET_DIETS, payload: json });
    }
}



// export function sortBy(payload) {
//     return async function (dispatch) {
//         const response = await fetch(`http://localhost:3001/recipes/?sortBy=${payload}`);
//         const json = await response.json();
//         dispatch({ type: SORT, payload: json });
//     }
// }

