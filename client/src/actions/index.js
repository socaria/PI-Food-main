import { GET_RECIPES, GET_RECIPE_DETAIL, CREATE_RECIPE, GET_DIETS } from './actions_type';

export function getRecipes(title){
    let url = 'http://localhost:3001/recipes';

    if(title) {
        url += `?title=${title}`
    }
    return async function(dispatch){
        const response = await fetch(url);
        const json = await response.json();
        dispatch({ type: GET_RECIPES, payload: json });
    }
}

export function getRecipeDetail(id) {
    return async function(dispatch) {
        const res = await fetch(`http://localhost:3001/recipes/${id}`);
        const obj = await res.json();
       
        return dispatch({
            type: GET_RECIPE_DETAIL,
            payload: obj
        });
    }
}

export const createRecipe = (input) => { 
    return { type: CREATE_RECIPE, payload:{
        title: input.title,
        summary: input.summary,
        healthScore: input.healthScore,
        instructions: input.instructions,
        diets: input.diets
    }
}};

export function getDiets(){
    return async function(dispatch){
        const response = await fetch(`http://localhost:3001/diets`);
        const json = await response.json();
        dispatch({ type: GET_DIETS, payload: json });
    }
}