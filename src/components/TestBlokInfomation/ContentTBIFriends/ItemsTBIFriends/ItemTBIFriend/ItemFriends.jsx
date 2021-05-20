import React from "react";
import s from './ItemFriends.module.css';
import {NavLink} from "react-router-dom";

const ItemFriend = (props) => {
    return (
        <div id={props.id} className={s.item}>
            <div className={s.itemAva}>
                <img alt='#' src={props.src}/>
            </div>
            <NavLink to='#' className={s.itemName}>{props.name}</NavLink>
        </div>

    )
}

export default ItemFriend;