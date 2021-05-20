import React from "react";
import s from './Mesages.module.css';
import {NavLink} from "react-router-dom";


const Messages = () => {
    return (
        <div className={s.navItem}>
            <NavLink to='/dialogs' activeClassName={s.active}>
                Messages
            </NavLink>
        </div>
    )
};

export default Messages;