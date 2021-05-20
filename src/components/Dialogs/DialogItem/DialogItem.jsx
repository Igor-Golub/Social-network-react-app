import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";


export const DialogItem = ({id, name }) => {

    let path = '/dialogs/' + id;

    return (
        <div className={s.dialog}>
            <NavLink to={path} className={s.dialogItem + ' ' + s.active}>{name}</NavLink>
        </div>
    )
};