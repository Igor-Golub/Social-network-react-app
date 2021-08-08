import {ResultCodeEnum, ResponseType} from '../api/api'
import {updateObjectInArray} from '../utils/object-iterations'
import {UserType} from '../types/СommonTypes'
import {Dispatch} from 'redux'
import {BaseThunksType, InferActionsType} from './redux-store'
import {usersAPI} from '../api/users-api'

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunksType<ActionsType>

export const initialState = {
  users: [] as Array<UserType>,
  pageSize: 6,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  isFollowingProgress: [] as Array<number>, // Array of usersId
  filter: {
    term: '',
    friend: null as null | boolean
  }
};

const userReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'user/social-network/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
      }
    case 'user/social-network/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
      }
    case 'user/social-network/SET_USERS':
      return {...state, users: action.users}
    case 'user/social-network/SET_CURRENT_PAGE':
      return {...state, currentPage: action.currentPage}
    case 'user/social-network/SET_TOTAL_USERS_COUNT':
      return {...state, totalUsersCount: action.count}
    case 'user/social-network/TOGGLE_IS_FETCHING':
      return {...state, isFetching: action.isFetching}
    case 'user/social-network/SET_FILTER':
      return {...state, filter: action.payload}
    case 'user/social-network/TOGGLE_IS_FOLLOWING_PROGRESS':
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

export const actions = {
  follow: (userId: number) => ({type: 'user/social-network/FOLLOW', userId} as const),
  unfollow: (userId: number) => ({type: 'user/social-network/UNFOLLOW', userId} as const),
  setUsers: (users: Array<UserType>) => ({type: 'user/social-network/SET_USERS', users} as const),
  setCurrentPage: (currentPage: number) => ({type: 'user/social-network/SET_CURRENT_PAGE', currentPage} as const),
  setFilter: (filter: FilterType) => ({type: 'user/social-network/SET_FILTER', payload: filter} as const),
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: 'user/social-network/SET_TOTAL_USERS_COUNT',
    count: totalUsersCount
  } as const),
  toggleIsFetching: (isFetching: boolean) => ({type: 'user/social-network/TOGGLE_IS_FETCHING', isFetching} as const),
  toggleFollowingProgress: (isFollowingProgress: any, userId: number) =>
    ({type: 'user/social-network/TOGGLE_IS_FOLLOWING_PROGRESS', isFollowingProgress, userId} as const)
}

// === thunks === //

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(currentPage))
    dispatch(actions.setFilter(filter))

    const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}

// === common function for thunks userUnfollow and userFollow === //
const followUnfollowFlow = async (dispatch: Dispatch<ActionsType>,
                                  id: number,
                                  apiMethod: (userId: number) => Promise<ResponseType>,
                                  actionCreator: (id: number) => ActionsType) => {
  dispatch(actions.toggleFollowingProgress(true, id))
  const data = await apiMethod(id)
  if (data.resultCode === ResultCodeEnum.Success) {
    dispatch(actionCreator(id))
  }
  dispatch(actions.toggleFollowingProgress(false, id))
}

export const userUnfollow = (id: number): ThunkType => {
  return async (dispatch: Dispatch<ActionsType>) => {
    await followUnfollowFlow(dispatch, id, usersAPI.userUnfollow.bind(id), actions.unfollow)
  }
}
export const userFollow = (id: number): ThunkType => {
  return async (dispatch: Dispatch<ActionsType>) => {
    await followUnfollowFlow(dispatch, id, usersAPI.userFollow.bind(id), actions.follow)
  }
}

// === /thunks === //

export default userReducer;