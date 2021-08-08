import {GetUsersItems, instance, ResponseType} from './api'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean = null) {
        return instance.get<GetUsersItems>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(res => res.data)
    },
    userFollow(id: number) {
        return instance.post<ResponseType>(`follow/${id}`)
            .then(res => res.data);
    },
    userUnfollow(id: number) {
        return instance.delete(`follow/${id}`)
            .then(res => res.data) as Promise<ResponseType>
    },
}