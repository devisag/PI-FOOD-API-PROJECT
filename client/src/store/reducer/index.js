import {
  FETCH_RECIPES,
  GET_DETAILS,
  DIET_TYPE_FILTER,
  ALPHA_SORT,
  HEALTH_SCORE_SORT,
  SEARCH_RECIPE,
  GET_DIET_TYPES,
  ADD_RECIPE,
  DELETE_RECIPE,
  DETAILS
} from "../actions/types";

const initialState = {
  recipes: [],
  allRecipes: [],
  recipeDetails: [],
  dietTypes: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        recipes: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        recipeDetails: action.payload,
      };
    case DIET_TYPE_FILTER:
      const allRecipes = state.allRecipes;
      const filteredByDiet = allRecipes.filter((r) =>
        r.diets?.some((d) => d === action.payload)
      );
      return {
        ...state,
        recipes: filteredByDiet,
      };
    case ALPHA_SORT:
      let sortedRecipes = [state.recipes];
      sortedRecipes = action.payload === "atoz"
          ? state.recipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedRecipes,
      };
    case HEALTH_SCORE_SORT:
      let sortedRecipeByScore = [...state.recipes];
      sortedRecipeByScore =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedRecipeByScore,
      };
    case SEARCH_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_DIET_TYPES:
      return {
        ...state,
        dietTypes: action.payload,
      };
    case ADD_RECIPE:
      return {
        ...state,
      }
    case DELETE_RECIPE:
      return{
        ...state,
      }
    case DETAILS:
      return{
        ...state,
        recipeDetails: []
      }
    default:
      return state;
  }
}

// estado local solo en un componente
// estado global en varios componentes
