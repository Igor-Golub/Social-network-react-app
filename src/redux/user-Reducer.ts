import {ResultCode, usersAPI} from '../api/api'
import {updateObjectInArray} from '../utils/object-iterations'
import {UserType} from '../Types/СommonTypes'
import {Dispatch} from 'redux'
import {AppStateType} from './redux-store'

const FOLLOW: string = 'samurai-network/user/FOLLOW'
const UNFOLLOW: string = 'samurai-network/user/UNFOLLOW'
const SET_USERS: string = 'samurai-network/user/SET_USERS'
const SET_CURRENT_PAGE: string = 'samurai-network/user/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT: string = 'samurai-network/user/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING: string = 'samurai-network/user/TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS: string = 'samurai-network/user/TOGGLE_IS_FOLLOWING_PROGRESS'

type InitialStateType = typeof initialState
const initialState = {
    users: [] as Array<UserType>,
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingProgress: [] as Array<number> // Array of usersId
};

const userReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId,'id',{followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId,'id',{followed: false})
            }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_USERS_COUNT:
            return { ...state, totalUsersCount: action.count }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                isFollowingProgress: action.isFollowingProgress
                    ? [...state.isFollowingProgress, action.userId]
                    : state.isFollowingProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

// === actionCreators === //

type ActionsTypes = FollowActionType | UnfollowActionType
                    | SetUsersActionType | SetCurrentPageActionType
                    | SetTotalUsersCountActionType | ToggleIsFetchingActionType
                    | ToggleFollowingProgressActionType

type FollowActionType = { type: typeof FOLLOW, userId: number }
export const follow = (userId: number): FollowActionType => {
    return { type: FOLLOW, userId }
}

type UnfollowActionType = { type: typeof UNFOLLOW, userId: number }
export const unfollow = (userId: number): UnfollowActionType => {
    return { type: UNFOLLOW, userId }
}

type SetUsersActionType = { type: typeof SET_USERS, users: UserType }
export const setUsers = (users: UserType): SetUsersActionType => {
    return { type: SET_USERS, users }
}

type SetCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
    return { type: SET_CURRENT_PAGE, currentPage }
}

type SetTotalUsersCountActionType = { type: typeof SET_TOTAL_USERS_COUNT, count: number }
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => {
    return { type: SET_TOTAL_USERS_COUNT, count: totalUsersCount }
}

type ToggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
    return { type: TOGGLE_IS_FETCHING, isFetching }
}

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFollowingProgress: Array<number>
    userId: number
}
export const toggleFollowingProgress = (isFollowingProgress: any, userId: number): ToggleFollowingProgressActionType => {
    return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollowingProgress, userId }
}

// === /actionCreators === //

// === thunks === //

type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>

export const getUsers =  (currentPage: number, pageSize: number) => {
    return async (dispatch: DispatchType, getState: GetStateType) => {
        dispatch(toggleIsFetching(true))
        dispatch(setCurrentPage(currentPage))
        const data = await usersAPI.getUsers(currentPage, pageSize)
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
    }
}

// === common function for thunks userUnfollow and userFollow === //
const followUnfollowFlow = async (dispatch: DispatchType, id: number,
                                  apiMethod: any, actionCreator: (id: number) => FollowActionType | UnfollowActionType) => {
    dispatch(toggleFollowingProgress(true, id))
    const response = await apiMethod(id)
        if (response.data.resultCode === ResultCode.Success) {dispatch(actionCreator(id));            }
    dispatch(toggleFollowingProgress(false, id))
}

export const userUnfollow = (id: number) => {
    return async (dispatch: DispatchType) => {
        return followUnfollowFlow(dispatch, id, usersAPI.userUnfollow.bind(id), unfollow)
    }
}
export const userFollow = (id: number) => {
    return async (dispatch: DispatchType) => {
        return  followUnfollowFlow(dispatch, id, usersAPI.userFollow.bind(id), follow)
    }
}

// === /thunks === //

export default userReducer;