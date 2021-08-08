export type ProfileUserType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    photos: PhotosType
    aboutMe: string
    facebook: string
}
export type PhotosType = {
    small: string | null,
    large: string | null
}
export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}