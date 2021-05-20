import axios from "axios";
import {ProfileUserType} from "../Types/СommonTypes";


// === common instance for settings axios requests === //
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'b79fe3de-421e-4ba5-b2ff-a8c7be7e976b'
    }
})

export enum ResultCode {
    Success= 0,
    Error= 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}


// === usersAPI === /

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    userUnfollow(id: number) {
        return instance.delete(`follow/${id}`)
    },

    userFollow(id: number) {
        return instance.post(`follow/${id}`, {})
    }
}

// === /usersAPI === /


// === profileAPI === /

export const profileAPI = {
    getUsersProfile(userId: number) {
        if (!userId) {
            userId = 2;
        }
        return instance.get(`profile/${userId}`)
    },
    getStatus(userId: number) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`/profile/status`, {
            status: status
        })
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileUserType) {
        return instance.put(`/profile`, profile)
    },
}

// === /profileAPI === /

// === authAPI === /

type MeResponseType = {
    data: { id: number, login: string, email: string }
    resultCode: ResultCode
    messages: Array<string>
}
type AuthLoginResponseType = {
    data: { id: number }
    resultCode: ResultCode | ResultCodeForCaptcha
    messages: Array<string>
}
type AuthLogoutResponseType = {
    data: any
    resultCode: ResultCode
    messages: Array<string>
}

export const authAPI = {
    authMe() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(res => res.data)
    },
    authLogin(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<AuthLoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    authLogout() {
        return instance.delete<AuthLogoutResponseType>(`auth/login`)
            .then(res => res.data)
    }
}

// === /authAPI === /

// === securityAPI === /

type getCaptchaUrlType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<getCaptchaUrlType>(`security/get-captcha-url`)
            .then(res => res.data)
    }
}

// === /securityAPI === /
