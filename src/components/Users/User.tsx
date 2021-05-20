import React from 'react'
import style from "./Users.module.css";
import userPhoto from "../../assec/images/user.jpg";
import {NavLink} from "react-router-dom";

interface PropsType {
    user: any
    isFollowingProgress: Array<number>
    userUnfollow: (id: number) => void
    userFollow: (id: number) => void
}

export const User: React.FC<PropsType> = ({user, isFollowingProgress, userUnfollow, userFollow}) => {

    return (
        <div>
            <span>
                         <div>
                             <NavLink to={'/profile/' + user.id}>
                             <img alt='#'
                                  src={user.photos.small != null ? user.photos.small : userPhoto}
                                  className={style.usersPhoto}/>
                             </NavLink>
                         </div>
                         <div>
                             {user.followed
                                 ? <button disabled={isFollowingProgress.some(id => id === user.id)} onClick={() => {
                                     userUnfollow(user.id)
                                 }}>Unfollow</button>
                                 : <button disabled={isFollowingProgress.some(id => id === user.id)} onClick={() => {
                                     userFollow(user.id)
                                 }}>Follow</button>
                             }
                                 </div>
                                 </span>
            <span>
                                 <div>
                                 <span>
                                 <div>{user.name}</div>
                                 <div>{user.status}</div>
                                 </span>
                                 </div>
                                 </span>
        </div>)
}