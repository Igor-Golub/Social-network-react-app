import React, {useEffect} from 'react'
import {Paginator} from "../../commons/Paginator/Paginator";
import {User} from "./User";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, getUsers} from "../../redux/user-Reducer";
import {AppStateType} from "../../redux/redux-store";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router-dom";
import * as queryString from "querystring";

type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users: React.FC = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const pageSize = useSelector((state: AppStateType) => state.usersPage.pageSize)
  const currentPage = useSelector((state: AppStateType) => state.usersPage.currentPage)
  const totalUsersCount = useSelector((state: AppStateType) => state.usersPage.totalUsersCount)
  const users = useSelector((state: AppStateType) => state.usersPage.users)
  const filter = useSelector((state: AppStateType) => state.usersPage.filter)
  const isFollowingProgress = useSelector((state: AppStateType) => state.usersPage.isFollowingProgress)

  const onPageChanged = (pageNumber: number) => dispatch(getUsers(pageNumber, pageSize, filter))
  const onFilterChanged = (filter: FilterType) => dispatch(getUsers(1, pageSize, filter))

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

    let actualPage =  currentPage
    let actualFilter = filter
    if(!!parsed.page) actualPage = +parsed.page
    if(!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

    switch (parsed.friend) {
      case 'null':
        actualFilter = {...actualFilter, friend: null}
        break
      case 'true':
        actualFilter = {...actualFilter, friend: true}
        break
      case 'false':
        actualFilter = {...actualFilter, friend: false}
        break
    }

    dispatch(getUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}

    if(!!filter.term) query.term = filter.term
    if(filter.friend !== null) query.friend = String(filter.friend)
    if(currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: '/users',
      search: queryString.stringify(query)
    })
  }, [filter, currentPage])

  return (
    <>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>
      <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize}
                 currentPage={currentPage} onPageChanged={onPageChanged}/>
      <div>
        {users.map(user => <User user={user} key={user.id}
                                 isFollowingProgress={isFollowingProgress}
        />)}
      </div>
    </>
  )
}