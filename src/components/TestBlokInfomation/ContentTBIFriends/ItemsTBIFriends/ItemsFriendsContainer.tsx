import React from "react";
import { useSelector} from "react-redux";
import ItemsFriends from "./ItemsFriends";
import {AppStateType} from "../../../../redux/redux-store";


export const ItemsFriendsContainer: React.FC = () => {

    const friendsInformation = useSelector((state: AppStateType) => state.friendsInformation.friends)

    return <>
        <ItemsFriends friends={friendsInformation}/>
    </>
}
