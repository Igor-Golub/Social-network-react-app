import React from "react";
import s from './ContentFriends.module.css';
import {ItemsFriendsContainer} from "./ItemsTBIFriends/ItemsFriendsContainer";



const ContentFriends: React.FC = () => {
    return (
        <div className={s.contentFiends}>
            <div className={s.propertyFiends}>online</div>
            <ItemsFriendsContainer />
        </div>
    )
}

export default ContentFriends;