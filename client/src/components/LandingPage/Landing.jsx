import React from "react";
import { Link } from 'react-router-dom';
import style from './landing.module.css';
import Logo from '../../assets/logotipo.png'

export default function LandingPage() {
    return (
        <div className={style.landingpage}>
            <div className={style.img}>
            <img src={Logo} alt="" />
            </div>
            <div className={style.bkgImg}>
            <div className={style.msg}>
            <h1 className={style.title}>Are you hungry?</h1>
            <h3 className={style.subtitle}>You are in the right place</h3>
            </div>
            <Link to='/home' id="click">
                <button className={style.btn}>Let's go</button>
            </Link>
            </div>
        </div>
    )
}