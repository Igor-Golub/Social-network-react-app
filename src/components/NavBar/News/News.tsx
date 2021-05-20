import React from "react";
import s from './News.module.css';
import {NavLink} from "react-router-dom";


const News: React.FC = () => {
    return (
        <div className={s.navItem}>
            <NavLink to='/news' activeClassName={s.active}>News</NavLink>
        </div>
    )
}

export default News;