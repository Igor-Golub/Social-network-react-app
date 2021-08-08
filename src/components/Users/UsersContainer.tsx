import React from "react";
import {connect} from "react-redux";
import {FilterType, getUsers, userFollow, userUnfollow} from "../../redux/user-Reducer";
import {Users} from "./Users";
import Preloader from "../../commons/Preloader/Preloader";
import {
  getCurrentPageS,
  getIsFetchingS,
  getIsFollowingProgressS,
  getPageSizeS,
  getTotalCountS,
  getUsersFilter,
  getUsersS
} from "../../redux/user-Selectors";
import {UserType} from "../../types/СommonTypes";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";
import {stat} from "fs";

interface PropsType {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
  userUnfollow: (id: number) => void
  userFollow: (id: number) => void
  users: Array<UserType>
  isFollowingProgress: Array<number>
  filter: FilterType
}

class UsersContainer extends React.Component<PropsType> { // описываем типы props и state

  componentDidMount() {
    const { currentPage, pageSize, filter } = this.props
    this.props.getUsers(currentPage, pageSize, filter)
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize, filter } = this.props
    this.props.getUsers(pageNumber, pageSize, filter)
  }

  onFilterChanged = (filter: FilterType) => {
    const {pageSize} = this.props
    this.props.getUsers(1, pageSize, filter)
  }

  render() {
    return <>
      { this.props.isFetching ? <Preloader/> : null }
      <Users totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             users={this.props.users}
             isFollowingProgress={this.props.isFollowingProgress}
             onPageChanged={this.onPageChanged}
             onFilterChanged={this.onFilterChanged}
             userUnfollow={this.props.userUnfollow}
             userFollow={this.props.userFollow}
      />
    </>
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    users: getUsersS(state),
    pageSize: getPageSizeS(state),
    totalUsersCount: getTotalCountS(state),
    currentPage: getCurrentPageS(state),
    isFetching: getIsFetchingS(state),
    isFollowingProgress: getIsFollowingProgressS(state),
    filter: getUsersFilter(state)
  }
}

export default compose(
  connect(mapStateToProps, {getUsers, userUnfollow, userFollow})
)(UsersContainer)