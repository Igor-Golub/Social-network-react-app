import React from 'react'
import {Paginator} from "../../commons/Paginator/Paginator";
import {User} from "./User";
import {UserType} from "../../Types/СommonTypes";

interface PropsType {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    isFollowingProgress: Array<number>
    userUnfollow: (id: number) => void
    userFollow: (id: number) => void
}

export const Users:React.FC<PropsType> = ({
                          totalUsersCount, pageSize, currentPage,
                          onPageChanged, users, isFollowingProgress,
                          userUnfollow, userFollow }) => {

    return (
        <div>
            <div>
                <Paginator totalItemsCount={totalUsersCount}
                           pageSize={pageSize}
                           currentPage={currentPage}
                           onPageChanged={onPageChanged}/>
            </div>
            <div>
                {users.map(user => <User user={user}
                                         key={user.id}
                                         isFollowingProgress={isFollowingProgress}
                                         userUnfollow={userUnfollow}
                                         userFollow={userFollow}
                />)}
            </div>
        </div>
    )
}