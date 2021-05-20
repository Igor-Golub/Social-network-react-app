import React from "react";
import s from './ItemsFriends.module.css';
import ItemFriend from "./ItemTBIFriend/ItemFriends";
import {FriendType} from "../../../../redux/friendsInformationReducer";


type TypeProps = { friends: Array<FriendType> }

const ItemsFriends: React.FC<TypeProps> = ({friends}) => {

    let friendName = friends.map((friendsName: any) =>
        <ItemFriend id={friendsName.id} name={friendsName.name} src={friendsName.src} key={friendsName.id} />);

    return (
        <div className={s.itemsFiends}>
            {friendName}
        </div>
    )
}

export default ItemsFriends;