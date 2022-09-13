import { sortByHealthScore } from '../actions';
import {
    GET_RECIPES,
    GET_RECIPE_DETAIL,
    CREATE_RECIPE,
    GET_DIETS,
    FILTER_BY_DIET,
    SORT_BY_TITLE,
    SORT_BY_HEALTH_SCORE
} from '../actions/actions_type';

const initialState = {
    recipes: [],
    allRecipes: [],
    recipeDetail: {},
    diets: []

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
                recipeDetail: action.payload
            }
        case CREATE_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload],
                allRecipes: [...state.recipes, action.payload]
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case FILTER_BY_DIET:
            const recipesFiltered = action.payload === 'All' ? state.allRecipes
                : state.allRecipes.filter(r => r.diets.includes(action.payload));
            return {
                ...state,
                recipes: recipesFiltered
            }
        case SORT_BY_TITLE:
            let sortedRecipesT = action.payload === 'titleAsc' ?
                state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return 1;
                    }
                    if (b.title > a.title) {
                        return -1;
                    }
                    return 0;


                })
                : state.recipes.sort(function (a, b) {
                    if (a.title > b.title) {
                        return -1;
                    }
                    if (b.title > a.title) {
                        return 1;
                    }
                    return 0;


                })
                return {
                    ...state,
                    recipes: sortedRecipesT
                }
        case SORT_BY_HEALTH_SCORE:
            let sortedRecipesHS = action.payload === 'healthScoreAsc' ?
            state.recipes.sort(function (a, b) {
                if (a.healthScore > b.healthScore) {
                    return 1;
                }
                if (b.healthScore > a.healthScore) {
                    return -1;
                }
                return 0;


            })
            : state.recipes.sort(function (a, b) {
                if (a.healthScore > b.healthScore) {
                    return -1;
                }
                if (b.healthScore > a.healthScore) {
                    return 1;
                }
                return 0;


            })
            return {
                ...state,
                recipes: sortedRecipesHS
            }
        default: return state;
    }
}

export default rootReducer;