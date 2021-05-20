import React from "react";
import s from './News.module.css';
import {NavLink} from "react-router-dom";


const Music = () => {
    return (
        <div className={s.navItem}>
            <NavLink to='/music' activeClassName={s.active}>Music</NavLink>
        </div>
    )
}

export default Music;