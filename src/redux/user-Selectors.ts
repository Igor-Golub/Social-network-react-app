import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

const getUsers = (state: AppStateType) => state.usersPage.users;
export const getPageSizeS = (state: AppStateType) => state.usersPage.pageSize;
export const getTotalCountS = (state: AppStateType) => state.usersPage.totalUsersCount;
export const getCurrentPageS = (state: AppStateType) => state.usersPage.currentPage;
export const getIsFetchingS = (state: AppStateType) => state.usersPage.isFetching;
export const getIsFollowingProgressS = (state: AppStateType) => state.usersPage.isFollowingProgress;

export const getUsersS = createSelector(getUsers, (users) => {
    return users.filter((user) => true)
})

