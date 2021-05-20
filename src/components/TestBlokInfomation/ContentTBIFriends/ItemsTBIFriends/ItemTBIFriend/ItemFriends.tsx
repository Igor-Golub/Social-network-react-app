import React from "react";
import s from './ItemFriends.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    id?: number
    name: string
    src: string
    key?: number
}

const ItemFriend: React.FC<PropsType> = ({name, src}) => {
    return (
        <div className={s.item}>
            <div className={s.itemAva}>
                <img alt='#' src={src}/>
            </div>
            <NavLink to='#' className={s.itemName}>{name}</NavLink>
        </div>

    )
}

export default ItemFriend;