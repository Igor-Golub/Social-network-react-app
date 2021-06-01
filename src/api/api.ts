import axios from "axios";
import {UserType} from "../types/СommonTypes";

// === common instance for settings axios requests === //
export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': 'b79fe3de-421e-4ba5-b2ff-a8c7be7e976b'
    }
})

// === common types === //
export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D,
    messages: Array<string>,
    resultCode: RC
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetUsersItems = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}

