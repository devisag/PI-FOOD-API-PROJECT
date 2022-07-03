import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, details, getDetails } from "../../store/actions/index";
import { Link, useParams, useHistory } from "react-router-dom";
import style from "./recipedetail.module.css";
import Loader from "../Loader/Loader";
import smoothscroll from "../../animations";

let prevId = 1;

export default function RecipeDetails() {
  const dispatch = useDispatch();
  /* const id = props.match.params.id; */
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(getDetails(id));
    return () => {
      dispatch(details())
    }
    /* smoothscroll() */
  }, [dispatch, id]); //?

  const history = useHistory();
  const recipe = useSelector((state) => state.recipeDetails);
  console.log(recipe);

  let arr = Object.values(recipe)

  function handleDeleteRecipe(e){
    e.preventDefault();
    dispatch(deleteRecipe(id))
    history.push("/home");
    /* smoothscroll() */
  }

  return (
    arr.length <= 1 ? <Loader /> :

    <div className={style.content} key={id}>
      <div className={style.header}>
      <h1>{recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)}</h1>
      <Link to="/home">
        <button className={style.backButton}>
          HOME
        </button>
      </Link>
      </div>

    <div className={style.main}>
      <div className={style.left}>
      <img src={recipe.image ? recipe.image : 'https://images.pexels.com/photos/10681224/pexels-photo-10681224.jpeg?auto=compress&cs=tinysrgb&h=450&w=860'} alt={recipe.name} />
      <div className={style.details}>
          {recipe.vegetarian ? (
            <p className={style.green}>Vegetarian</p>
          ) : (
            <p className={style.red}>Vegetarian</p>
          )}
          {recipe.vegan ? (
            <p className={style.green}>Vegan</p>
          ) : (
            <p className={style.red}>Vegan</p>
          )}
          {recipe.glutenFree ? (
            <p className={style.green}>Gluten Free</p>
          ) : (
            <p className={style.red}>Gluten Free</p>
          )}
          {recipe.dairyFree ? (
            <p className={style.green}>Dairy Free</p>
          ) : (
            <p className={style.red}>Dairy Free</p>
          )}
        </div>
        <div className={style.rowLeft}>
        {recipe.types ? (
        <div className={style.types}>
          <h4>🍽️​ Dish Type:​</h4>
            {recipe.types?.map((e) => {
              return (
                <h5 className={style.typesText} key={e}>
                  - {e}
                </h5>
              );
            })}
        </div>
      ) : (
        <p>We didn't find dish type</p>
      )}

      <div className={style.scoreRow}>
      <p className={style.healthScore}>❤️​ Health Score: {recipe.healthScore}</p>
      <p className={style.share}>​↗️​ Share Recipe</p>
      </div>
        </div>
      </div>

      <div className={style.right}>
      <div className={style.summaryCont}>
        <h3 className={style.subtitle}>Summary:</h3>
        <p className={style.summary}>
          {recipe.summary?.replace(/<[^>]*>/g, "")}
        </p>
        <h3 className={style.subtitle}>Steps:</h3>
        <ul>{recipe.steps?.steps ? recipe.steps?.steps?.map(step => {
               return (
                  <li key={prevId++}>{step.step}</li>
               )
            }) : <li key={prevId++}>{recipe.steps}</li>}</ul>
         <br />
         <div className={style.diets}>
        {recipe.diets?.map((e) => {
          return (
            <h5 className={style.diet} key={e}>
             { e.name ? e.name : e}
            </h5>
          ); 
        })}
      </div>
      </div>
      </div>
      </div>
      {id.length < 12 ? <p>No esta permitido eliminar este elemento</p> :  <button onClick={handleDeleteRecipe} className={style.deleteBtn}>Delete Recipe</button>}
    </div>
  );
}
