import React from "react";
import s from './ItemsFriends.module.css';
import ItemFriend from "./ItemTBIFriend/ItemFriends";


const ItemsFriends = (props) => {

    let friendName = props.friendsInformation.friends.map((friendsName) =>
        <ItemFriend id={friendsName.id} name={friendsName.name} src={friendsName.src} key={friendsName.id} />);

    return (
        <div className={s.itemsFiends}>
            {friendName}
        </div>
    )
}

export default ItemsFriends;