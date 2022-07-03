import React from "react";
import style from "./recipe.module.css";
import { Link } from "react-router-dom";

let prevId = 1;

export default function Recipe(recipes) {
  const { image, name, diets, id, hs } = recipes;
  return (
    <div className={style.recipe}>
      <div className={style.imgmobile}>
        <img className={style.recipeImgmobile} src={image ? image : 'https://images.pexels.com/photos/10681224/pexels-photo-10681224.jpeg?auto=compress&cs=tinysrgb&h=450&w=860'} alt={`${name}`} />
        <h3 className={style.namemobile}>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      </div>
      <h3 className={style.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
      <div className={style.score}>
        <p className={style.numScore}>{hs}</p>
        <p className={style.hscore}>health score</p>
      </div>
        

      <div className={style.img}>
        <img className={style.recipeImg} src={image ? image : 'https://images.pexels.com/photos/10681224/pexels-photo-10681224.jpeg?auto=compress&cs=tinysrgb&h=450&w=860'} alt={`${name}`} />
      </div>

        <div className={style.diets}>
          {diets?.map((e) => {
            return <h5 className={style.diet} key={prevId++}>{ e.name ? e.name : e}</h5>;
          })}
        </div>

      <Link to={`home/${id}`} style={{ textDecoration: 'none' }}>
        <p className={style.details}>VER MÁS</p>
      </Link>

         {/* Mobile */} 
      <Link to={`home/${id}`} style={{ textDecoration: 'none' }}>
        <p className={style.detailsmobile}>+</p>
      </Link>
    </div>
  );
}
