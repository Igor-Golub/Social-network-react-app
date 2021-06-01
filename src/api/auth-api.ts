import {instance, ResponseType, ResultCodeEnum, ResultCodeForCaptchaEnum} from "./api";

// === types === //

type MeResponseDataType = {
    id: number,
    login: string,
    email: string
}
type AuthLoginResponseDataType = {
    id: number
}

// === / types === //

export const authAPI = {
    authMe() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`)
            .then(res => res.data)
    },
    authLogin(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<AuthLoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    authLogout() {
        return instance.delete(`auth/login`)
            .then(res => res.data)
    }
}