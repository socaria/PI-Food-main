import {
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    GET_DIETS,
    CREATE_RECIPE,
    FILTER_BY_DIET,
    GET_ERROR,
    SORT
} from '../actions/actions_type';

const initialState = {
    recipes: [],
    allRecipes: [],
    recipeDetail: {},
    diets: [],
    getError: ""
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
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
                recipes: action.payload
            }
        case SORT :
            return {
                ...state,
                recipes: action.payload
            }
        // case SORT_BY_TITLE:
        //     let sortedRecipesT =
        //         state.recipes.sort(function (a, b) {
        //             if (a.title.toLowerCase() > b.title.toLowerCase()) {
        //                 if (action.payload === 'titleAsc') return 1;
        //                 return -1;
        //             }
        //             if (b.title.toLowerCase() > a.title.toLowerCase()) {
        //                 if (action.payload === 'titleAsc') return -1;
        //                 return 1;
        //             }
        //             return 0;
        //         })
        //     return {
        //         ...state,
        //         recipes: sortedRecipesT
        //     }
        // case SORT_BY_HEALTH_SCORE:
        //     let sortedRecipesHS =
        //         state.recipes.sort(function (a, b) {
        //             if (a.healthScore > b.healthScore) {
        //                 if (action.payload === 'healthScoreAsc') return 1;
        //                 return -1;
        //             }
        //             if (b.healthScore > a.healthScore) {
        //                 if (action.payload === 'healthScoreAsc') return -1;
        //                 return 1;
        //             }
        //             return 0;
        //         })
        //     return {
        //         ...state,
        //         recipes: sortedRecipesHS
        //     } 
        case GET_ERROR:
            return {
                ...state,
                getError: action.payload
            }

        default: return state;
    }
}

export default rootReducer;

