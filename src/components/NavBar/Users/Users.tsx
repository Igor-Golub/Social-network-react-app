import React from "react";
import s from './Users.module.css';
import {NavLink} from "react-router-dom";

const Users: React.FC = () => {
    return (
        <div className={s.navItem}>
            <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
        </div>
    )
}

export default Users;