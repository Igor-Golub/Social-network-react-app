import { BaseThunksType, InferActionsType} from "./redux-store";
import {securityAPI} from "../api/security-api";
import {authAPI} from "../api/auth-api";
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
type ActionsType = InferActionsType<typeof actions>
type ThunksType = BaseThunksType<ActionsType>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL_SUCCESS:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (
        userId: number | null, email: string | null,
        login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA,
        payload: {userId, email, login, isAuth}
    } as const),

    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: SET_CAPTCHA_URL_SUCCESS,
        payload: {captchaUrl}
    } as const)
}

export const authMe = (): ThunksType => async (dispatch) => {
    const meData = await authAPI.authMe();
    if (meData.resultCode === ResultCodeEnum.Success) {
        let {id, email, login} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const getCaptchaUrl = (): ThunksType => async (dispatch) => {
    const getCaptchaUrlData = await securityAPI.getCaptchaUrl()
    const captchaUrl = getCaptchaUrlData.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
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
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

// === /thunks === //

export default authReducer;