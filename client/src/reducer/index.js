import {
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    CREATE_RECIPE,
    GET_DIETS
} from '../actions/actions_type';

const initialState = {
    recipes: [],
    recipeDetail: {},
    diets: []

}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload
            }
        case CREATE_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        default: return state;
    }
}

export default rootReducer;