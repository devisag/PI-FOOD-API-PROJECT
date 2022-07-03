import React from 'react'
import style from './loader.module.css'

export default function Loader() {
  return (
    <div className={style.container}>
    <div className={style.spinner}></div>
    <h3 className={style.loading}>🔍​ Loading...</h3>​
    </div>
  )
}