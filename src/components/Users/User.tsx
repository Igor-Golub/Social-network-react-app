import React from 'react'
import style from "./Users.module.css";
import userPhoto from "../../assec/images/user.jpg";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userFollow, userUnfollow} from '../../redux/user-Reducer';

interface PropsType {
  user: any
  isFollowingProgress: Array<number>
}

export const User: React.FC<PropsType> = ({user, isFollowingProgress}) => {

  const dispatch = useDispatch()

  return (
    <>
      <span>
        <>
          <NavLink to={'/profile/' + user.id}>
            <img alt='#'
                 src={user.photos.small != null ? user.photos.small : userPhoto}
                 className={style.usersPhoto}/>
          </NavLink>
        </>
        <div>
          {user.followed
            ? <button disabled={isFollowingProgress.some(id => id === user.id)} onClick={() => {
              dispatch(userUnfollow(user.id))
            }}>Unfollow</button>
            : <button disabled={isFollowingProgress.some(id => id === user.id)} onClick={() => {
              dispatch(userFollow(user.id))
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
    </>
  )
}