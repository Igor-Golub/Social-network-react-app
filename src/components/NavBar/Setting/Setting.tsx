import React from "react";
import s from './Setting.module.css';
import {NavLink} from "react-router-dom";


const Setting: React.FC = () => {
    return (
        <div className={s.navItem}>
            <NavLink to='/setting' activeClassName={s.active}>Setting</NavLink>
        </div>
    )
}

export default Setting;