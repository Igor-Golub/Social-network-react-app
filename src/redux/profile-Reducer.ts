import {profileAPI} from "../api/api";
import {PhotosType, ProfileUserType} from "../Types/СommonTypes";
import {Dispatch} from "redux";

const ADD_POST: string = 'samurai-network/profile/ADD_POST';
const SET_USERS_PROFILE: string = 'samurai-network/profile/SET_USERS_PROFILE';
const SET_USER_STATUS: string = 'samurai-network/profile/SET_USER_STATUS';
const DELETE_POST: string = 'samurai-network/profile/DELETE_POST';
const SET_PHOTO_SUCCESS: string = 'samurai-network/profile/SET_PHOTO_SUCCESS';
const SET_PROFILE_SUCCESS: string = 'samurai-network/profile/SET_PROFILE_SUCCESS'

type PostsType = { id: string, message: string, likes: string }
type InitialStateType = typeof initialState
const initialState = {
    posts: [
        {id: '1', message: 'Hi, I am a good junior react developer!', likes: '15 like'},
        {id: '2', message: 'Oh, it is really cool, because we find good react developer!', likes: '4 like'},
        {id: '3', message: 'Good!!', likes: '0 like'}
    ] as Array<PostsType>,
    profileUser: null as ProfileUserType | null,
    newPostText: '',
    status: ''
};

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST :
            let newPost = {
                id: '5',
                message: action.post,
                likes: '0 like'
            }
            return {
                ...state, posts: [...state.posts, newPost], newPostText: ''
            }
        case DELETE_POST :
            return {
                ...state,
                posts: {...state.posts.filter(post => post.id !== action.postId)}
            }
        case SET_USERS_PROFILE:
            return { ...state, profileUser: action.profileUser }
        case SET_USER_STATUS:
            return { ...state, status: action.status }
        case SET_PHOTO_SUCCESS:
            return {
                ...state, profileUser: {...state.profileUser, photos: action.photos} as ProfileUserType
            }
        case SET_PROFILE_SUCCESS:
            return {
                ...state
            }
        default:
            return state;
    }
}

// === actionCreators === //

type ActionsTypes = AddPostActionType | DeletePostActionType | SetUsersProfileActionType
                    | SetUserProfileStatusActionType | SavePhotoSuccessActionType| SaveProfileSuccessActionType

type AddPostActionType = { type: typeof ADD_POST, post: string }
export const addPost = (post: string): AddPostActionType => {
    return { type: ADD_POST, post }
}

type DeletePostActionType = { type: typeof DELETE_POST, postId: number }
export const deletePost = (postId: number): DeletePostActionType => {
    return { type: DELETE_POST, postId }
}

type SetUsersProfileActionType = { type: typeof SET_USERS_PROFILE, profileUser: ProfileUserType }
export const setUsersProfile = (profileUser: ProfileUserType): SetUsersProfileActionType => {
    return { type: SET_USERS_PROFILE, profileUser }
}

type SetUserProfileStatusActionType = { type: typeof SET_USER_STATUS, status: string }
export const setUserProfileStatus = (status: string): SetUserProfileStatusActionType => {
    return { type: SET_USER_STATUS, status }
}

type SavePhotoSuccessActionType = { type: typeof SET_PHOTO_SUCCESS, photos: PhotosType }
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => {
    return { type: SET_PHOTO_SUCCESS, photos }
}

type SaveProfileSuccessActionType = { type: typeof SET_PROFILE_SUCCESS, profile: any }
export const saveProfileSuccess = (profile: any): SaveProfileSuccessActionType => {
    return { type: SET_PROFILE_SUCCESS, profile }
}

// === /actionCreators === //

// === thunks === //

type DispatchType = Dispatch<ActionsTypes>

export const getUsersProfile = (userId: number) => async (dispatch: DispatchType) => {
    const response = await profileAPI.getUsersProfile(userId);
    dispatch(setUsersProfile(response.data))
}

export const getStatus = (userId: number) => async (dispatch: DispatchType) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setUserProfileStatus(response.data))
}
export const updateStatus = (status: string) => async (dispatch: DispatchType) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserProfileStatus(status))
    }
}
export const savePhoto = (file: any) => async (dispatch: DispatchType) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile: ProfileUserType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUsersProfile(userId))
    }
}

// === /thunks === //

export default profileReducer;

