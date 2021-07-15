import {PhotosType, ProfileUserType} from "../types/СommonTypes";
import {profileAPI} from "../api/profile-api";
import {BaseThunksType, InferActionsType} from "./redux-store";

type PostsType = { id: string, message: string, likes: string }
type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunksType = BaseThunksType<ActionsType>

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

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'profile/social-network/ADD_POST' :
            let newPost = {
                id: '5',
                message: action.post,
                likes: '0 like'
            }
            return {
                ...state, posts: [...state.posts, newPost], newPostText: ''
            }
        case 'profile/social-network/DELETE_POST' :
            return {
                ...state,
                posts: {...state.posts}
            }
        case 'profile/social-network/SET_USERS_PROFILE':
            return {...state, profileUser: action.profileUser}
        case 'profile/social-network/SET_USER_STATUS':
            return {...state, status: action.status}
        case 'profile/social-network/SET_PHOTO_SUCCESS':
            return {
                ...state, profileUser: {...state.profileUser, photos: action.photos} as ProfileUserType
            }
        case 'profile/social-network/SET_PROFILE_SUCCESS':
            return {
                ...state
            }
        default:
            return state;
    }
}

export const actions = {
    addPost: (post: string) => ({type: 'profile/social-network/ADD_POST', post} as const),
    deletePost: (postId: number) => ({type: 'profile/social-network/DELETE_POST', postId} as const),
    setUsersProfile: (profileUser: ProfileUserType) => ({
        type: 'profile/social-network/SET_USERS_PROFILE',
        profileUser
    } as const),
    setUserProfileStatus: (status: string) => ({type: 'profile/social-network/SET_USER_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'profile/social-network/SET_PHOTO_SUCCESS', photos} as const),
    saveProfileSuccess: (profile: any) => ({type: 'profile/social-network/SET_PROFILE_SUCCESS', profile} as const)
}

export const getUsersProfile = (userId: number): ThunksType => async (dispatch) => {
    const data = await profileAPI.getUsersProfile(userId);
    dispatch(actions.setUsersProfile(data))
}
export const getStatus = (userId: number): ThunksType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId)
    dispatch(actions.setUserProfileStatus(data))
}
export const updateStatus = (status: string): ThunksType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(actions.setUserProfileStatus(status))
    }
}
export const savePhoto = (file: File): ThunksType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}
export const saveProfile = (profile: ProfileUserType): ThunksType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUsersProfile(userId))
        } else {
            throw new Error('userId can`t be null')
        }
    }
}

export default profileReducer;

