import React from 'react'
import {Paginator} from "../../commons/Paginator/Paginator";
import {User} from "./User";
import {UserType} from "../../types/СommonTypes";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/user-Reducer";

interface PropsType {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    isFollowingProgress: Array<number>
    userUnfollow: (id: number) => void
    userFollow: (id: number) => void
    onFilterChanged: (filter: FilterType) => void
}

export const Users: React.FC<PropsType> = ({
                                               totalUsersCount, pageSize, currentPage,
                                               onPageChanged, users, isFollowingProgress,
                                               userUnfollow, userFollow, onFilterChanged
                                           }) => {

    return (
        <>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <Paginator totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged}/>
            <div>
                {users.map(user => <User user={user}
                                         key={user.id}
                                         isFollowingProgress={isFollowingProgress}
                                         userUnfollow={userUnfollow}
                                         userFollow={userFollow}
                />)}
            </div>
        </>
    )
}