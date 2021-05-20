import React from "react";
import s from './Setting.module.css';
import {NavLink} from "react-router-dom";


const Setting = () => {
    return (
        <div className={s.navItem}>
            <NavLink to='/setting' activeClassName={s.active}>Setting</NavLink>
        </div>
    )
}

export default Setting;