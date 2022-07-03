import axios from 'axios'
import { FETCH_RECIPES, GET_DETAILS, DIET_TYPE_FILTER, ALPHA_SORT, HEALTH_SCORE_SORT, GET_DIET_TYPES, SEARCH_RECIPE, DETAILS} from './types'

export function fetchRecipes() {
   return function(dispatch) {
      axios.get(`https://webappfood.herokuapp.com/recipes`)
      .then((recipes) => {
         dispatch({
            type: FETCH_RECIPES,
            payload: recipes.data
         }, [])
      })
      .catch((err) => console.log(err))
   }
}

export function getDetails(payload){
   return function(dispatch){
      axios.get(`https://webappfood.herokuapp.com/recipes/${payload}`)
      .then((response) => {
         dispatch({
            type: GET_DETAILS,
            payload: response.data
         })
         console.log(response.data)
      })
      .catch((err) => console.log(err))
   }
}

export function dietFilter(payload){
   return{
      type: DIET_TYPE_FILTER,
      payload
   }
}

export function alphaSort(payload) {
   return {
       type: ALPHA_SORT,
       payload
   }
};

export function healthScoreSort(payload) {
   return {
       type: HEALTH_SCORE_SORT,
       payload
   }
}

/* export function getRecipeByName(payload){
   return async function(dispatch){
      try{
         var response = await axios.get(`/recipes?name=${payload}`);
         return dispatch({type: SEARCH_RECIPE, payload: response.data})
      } catch {
         return alert ('Recipe Not Found')
      }
   }
} */

export function getRecipeByName(payload){
   return function(dispatch){
      axios.get(`https://webappfood.herokuapp.com/recipes?name=${payload}`)
      .then((response)=> {
         dispatch({
            type:SEARCH_RECIPE,
            payload: response.data
         })
      })
      .catch(
         (err) => console.log(err)
      )
   }
}

export function getDietTypes(){
   return function(dispatch){
      axios.get(`https://webappfood.herokuapp.com/diet`)
      .then((diets) => {
         dispatch({
            type: GET_DIET_TYPES, 
            payload: diets.data.map(d => d.name)});
         }, [])
         .catch((err) => console.log(err))
      }
   }

export function addRecipe(payload){
   return async function(){
      try{
         let response = await axios.post(`https://webappfood.herokuapp.com/recipe`, payload);
         return response;
      } catch (err){
         console.log(err)
      }
   }
}

export function deleteRecipe(payload){
   return async function(){
      try{
         let response = await axios.delete(`https://webappfood.herokuapp.com/recipes/${payload}`)
         console.log(response)
      } catch(err) {
         console.log(err)
      }
   }
}

export function details(){
   return {
      type: DETAILS
   }
}