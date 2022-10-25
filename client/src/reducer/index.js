import {
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    CREATE_RECIPE,
    REQUEST_ERROR,
    SORT,
    CURRENT_PAGE,
    FILTER_BY_DIET,
    EDIT_RECIPE,
    DELETE_RECIPE,
    GET_RECIPES_LOADING
} from '../actions/actions_type';

const initialState = {
    recipes: [],
    isRecipiesLoading: false,
    allRecipes: [],
    recipeDetail: {},
    diets: [],
    errorMessage: "",
    currentPage: 1,
    queryParams: null

}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload,
                errorMessage: "",
                queryParams: action.query,
                isRecipiesLoading: false,
            }
        case GET_RECIPES_LOADING:
            return {
                ...state,
                isRecipiesLoading: true,
            }
        case CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case GET_RECIPE_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload,
                isRecipiesLoading: false,
            }
        case EDIT_RECIPE:
            return {
                ...state,
                recipeDetail: action.payload
            }
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: action.payload
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
        case SORT:
            return {
                ...state,
                recipes: action.payload
            }
        case FILTER_BY_DIET:
            return {
                ...state,
                recipes: state.allRecipes.filter(r => r.diets.find(d => d.name === action.payload)),
                queryParams: { ...state.queryParams, diet: action.payload }
            }

        case REQUEST_ERROR:
            return {
                ...state,
                errorMessage: action.payload,
                isRecipiesLoading: false,
            }

        default: return state;
    }
}

export default rootReducer;

