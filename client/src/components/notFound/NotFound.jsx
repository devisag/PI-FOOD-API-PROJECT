import React from "react";
import notFound from '../../assets/404-not-found.png'
import style from './notfound.module.css'

export default function NotFound(){
   return(
      <div className={style.notfound}>
         <img className={style.img} src={notFound} alt="" />
      </div>
   )
}