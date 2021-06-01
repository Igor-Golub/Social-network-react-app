import {PhotosType, ProfileUserType} from "../types/СommonTypes";
import {instance, ResponseType} from "./api";

type SavePhotosResponseData = {
    photos: PhotosType
}


export const profileAPI = {
    getUsersProfile(userId: number) {
        return instance.get<ProfileUserType>(`profile/${userId}`)
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`/profile/status/${userId}`)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`/profile/status`, {
            status: status
        })
            .then(res => res.data)
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<ResponseType<SavePhotosResponseData>>(`/profile/photo`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then(res => res.data)
    },
    saveProfile(profile: ProfileUserType) {
        return instance.put<ResponseType>(`/profile`, profile)
            .then(res => res.data)
    },
}