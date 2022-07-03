import React from 'react'
import style from './paged.module.css'
import Loader from '../Loader/Loader';

function Paged({recipesPage, allRecipes, paged, page}) {

   const actualPage = page;
   const pages = [];

   for(let i = 1; i <= Math.ceil(allRecipes/recipesPage); i++){
      pages.push(i);
   };

   return(
      <>
      {pages.length < 1 ? <Loader />:
         <>
         <div className={style.container} >
            {pages?.map(p => (
               <a className={(actualPage === p ? style.pageActive : style.page)} key={p} onClick={() => paged(p)}>{p}</a>
               ))}
               </div>
             </>
         
      } 
      </>
   )
}

export default Paged