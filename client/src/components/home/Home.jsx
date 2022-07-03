import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, alphaSort, healthScoreSort, dietFilter } from "../../store/actions/index";
import { Link } from "react-router-dom"
import style from "./home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import Recipe from '../recipe/Recipe'
import Paged from "../Paged/Paged";
import smoothscroll from '../../animations'
import menu from '../../assets/list-bold.svg'
import close from '../../assets/x-circle-bold.svg'

let prevId = 1;

export default function Home() {

  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [recipesPage, setRecipesPage] = useState(9);

  const quantityRecipesPage = page * recipesPage; 
  const firstPage = quantityRecipesPage - recipesPage; 
  const showRecipesPage = recipes.slice(firstPage, quantityRecipesPage)

  const paged = function(pageNumber){
    setPage(pageNumber);
    smoothscroll()
  }

  const [order, setOrder] = useState('')

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(fetchRecipes());
    setPage(1)
  }

  function handleAlphaSort (e){
    e.preventDefault();
    dispatch(alphaSort(e.target.value))
    console.log(e.target.value)
    setOrder(`Order ${e.target.value}`)
    smoothscroll()
    setPage(1)
  }

  function hScoreSort(e){
    e.preventDefault();
    dispatch(healthScoreSort(e.target.value))
    console.log(e.target.value)
    setOrder(`Order ${e.target.value}`)
    smoothscroll()
    setPage(1)
  }

  function handleDietTypeFilter(e){
    e.preventDefault();
    dispatch(dietFilter(e.target.value))
    smoothscroll()
    setPage(1)
  }

  return (
    <div className={style.main}>

        <label for="check">
          <img className={style.btnmenu} src={menu} alt=""/>
          <img src={close} alt="" className={style.closemenu}/>
        </label>
        <input type="checkbox" id="check" className={style.checkmenu} />

   <div className={style.sideBar}>
        <div className={style.select}>
          <h4>Alphabetical</h4>
          <button value="atoz" onClick={e => handleAlphaSort(e)}>A to Z</button>
          <button value="ztoa" onClick={e => handleAlphaSort(e)}>Z to A</button>
        </div>
        <div className={style.select}>
          <h4>Health Score</h4>
          <button value='asc' onClick={e => hScoreSort(e)}>Min to Max</button>
          <button value='desc' onClick={e => hScoreSort(e)}>Max to Min</button>
        </div>

        <div className={style.select}>
          <h4>
            Diet Types
          </h4>
          <button value='gluten free' onClick={e => handleDietTypeFilter(e)}>Gluten Free</button>
          <button value='ketogenic' onClick={e => handleDietTypeFilter(e)}>Keto</button>
          <button value='vegetarian' onClick={e => handleDietTypeFilter(e)}>Vegetarian</button>
          <button value='lacto vegetarian' onClick={e => handleDietTypeFilter(e)}>Lacto-Vegetarian</button>
          <button value='ovo vegetarian' onClick={e => handleDietTypeFilter(e)}>Ovo-Vegetarian</button>
          <button value='lacto ovo vegetarian' onClick={e => handleDietTypeFilter(e)}>Lacto-Ovo-Vegetarian</button>
          <button value='vegan' onClick={e => handleDietTypeFilter(e)}>Vegan</button>
          <button value='pescetarian' onClick={e => handleDietTypeFilter(e)}>Pescetarian</button>
          <button value='paleolithic' onClick={e => handleDietTypeFilter(e)}>Paleo</button>
          <button value='primal' onClick={e => handleDietTypeFilter(e)}>Primal</button>
          <button value='low fodmap' onClick={e => handleDietTypeFilter(e)}>Low FODMAP</button>
          <button value='whole 360' onClick={e => handleDietTypeFilter(e)}>Whole30</button>
          <button value='dairy free' onClick={e => handleDietTypeFilter(e)}>Dairy Free</button>
        </div>

    </div>

   <div className={style.nav} >
      <div className={style.content}>
      <SearchBar />
        <nav className={style.navbar}>
          <Link to="/home">
            <button className={style.item} onClick={handleClick}>
              What's New?
            </button>
          </Link>
          <Link to="/createrecipe">
            <button className={style.item}>Create a Recipe</button>
          </Link>
        </nav>
      </div>
      <div className={style.recipes}>
         {
            showRecipesPage?.map(e => {
               return (
                  <div className={style.recipe} key={prevId++}>
                        <Recipe image={e.image}
                        name={e.name}
                        diets={e.diets}
                        id={e.id}
                        hs={e.healthScore}
                        />
                  </div> 
               )
            })
         }
         <Paged recipesPage={recipesPage} allRecipes={recipes.length} paged={paged} page={page}/>
    </div>
    
   </div>
    </div>
  );
}
