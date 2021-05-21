import React from "react";
import s from './HeaderLogin.module.css';
import {NavLink} from "react-router-dom";

const HeaderLogin = (props) => {
    return (
        <div className={s.wrapperHeaderButton}>
            {props.isAuth
                ? <div>{props.login} <button onClick={props.authLogout}>Log out</button></div>
                : <NavLink to={'/login'} className={s.headerButton}>Login</NavLink>}
        </div>
    )
}

export default HeaderLogin;