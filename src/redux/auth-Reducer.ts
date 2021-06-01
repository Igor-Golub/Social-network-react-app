import { ThunkAction } from "redux-thunk";
import {AppStateType} from "./redux-store";
import {securityAPI} from "../api/security-api";
import { authAPI } from "../api/auth-api";
import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";

const SET_USER_DATA: string = 'samurai-network/auth/SET_USER_DATA';
const SET_CAPTCHA_URL_SUCCESS: string = 'samurai-network/auth/SET_CAPTCHA_URL';

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    isFetching: false as boolean,
    followingInProgress: false as boolean,
    captchaUrl: null as string | null
};

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL_SUCCESS:
            return { ...state, ...action.payload  }
        default:
            return state;
    }
}

// === actionCreators === //

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessType

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}
type SetAuthUserDataActionPayloadType = {
    userId: number | null, email: string | null, login: string | null, isAuth: boolean
}

export const setAuthUserData = (userId: number | null, email: string | null,
                                login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return {
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth }
    }
}

type GetCaptchaUrlSuccessType = {
    type: typeof SET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessType => {
    return {
        type: SET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    }
}

// === /actionCreators === //

// === thunks === //

type ThunksType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const authMe = (): ThunksType  => async (dispatch) => {
    const meData = await authAPI.authMe();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}
export const getCaptchaUrl = (): ThunksType => async (dispatch) => {
    const getCaptchaUrlData = await securityAPI.getCaptchaUrl()
    const captchaUrl = getCaptchaUrlData.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const authLogin = (email: string, password: string,
                          rememberMe: boolean, captchaUrl: string): ThunksType => async (dispatch) => {
    const authLoginData = await authAPI.authLogin(email, password, rememberMe, captchaUrl)
    if (authLoginData.resultCode === ResultCodeEnum.Success) {
        dispatch(authMe())
    } else if (authLoginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl())
    }
}

export const authLogout = (): ThunksType => async (dispatch) => {
    debugger
    const authLogoutData = await authAPI.authLogout()
    if (authLogoutData.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

// === /thunks === //

export default authReducer;