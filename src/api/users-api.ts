import {GetUsersItems, instance} from './api'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersItems>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    userUnfollow(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`)
            .then(res => res.data)
    },
    userFollow(id: number) {
        return instance.post(`follow/${id}`, {})
            .then(res => res.data) as Promise<ResponseType>
    }
}