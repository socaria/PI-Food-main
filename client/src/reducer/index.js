import {
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    CREATE_RECIPE,
    FILTER_BY_DIET,
    REQUEST_ERROR,
    SORT,
    CURRENT_PAGE
} from '../actions/actions_type';

const initialState = {
    recipes: [],
    allRecipes: [],
    recipeDetail: {},
    diets: [],
    errorMessage: "",
    currentPage: 1,
    
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                errorMessage: ""
            }
            case CURRENT_PAGE:
                console.log("🚀 ~ file: index.js ~ line 40 ~ rootReducer ~ action.payload", action.payload)
                return {
                    ...state,
                    currentPage: action.payload
                }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload,
            }
        case CREATE_RECIPE:
            return {
                ...state
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case FILTER_BY_DIET:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
            }
        case SORT:
            return {
                ...state,
                recipes: action.payload
            }

        case REQUEST_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }

        default: return state;
    }
}

export default rootReducer;

