import React from "react";
import {connect} from "react-redux";
import {getUsers, setCurrentPage, userFollow, userUnfollow} from "../../redux/user-Reducer";
import {Users} from "./Users";
import Preloader from "../../commons/Preloader/Preloader";
import {
    getCurrentPageS,
    getIsFetchingS,
    getIsFollowingProgressS,
    getPageSizeS,
    getTotalCountS,
    getUsersS
} from "../../redux/user-Selectors";
import {UserType} from "../../Types/СommonTypes";
import {AppStateType} from "../../redux/redux-store";
import {compose} from "redux";

interface PropsType {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    getUsers: (currentPage: number, pageSize: number) => void
    userUnfollow: (id: number) => void
    userFollow: (id: number) => void
    users: Array<UserType>
    isFollowingProgress: Array<number>
}
class UsersContainer extends React.Component<PropsType> { // описываем типы props и state

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }
    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   isFollowingProgress={this.props.isFollowingProgress}
                   onPageChanged={this.onPageChanged}
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
        isFollowingProgress: getIsFollowingProgressS(state)
    }
}

/*connect автомотически создает callback function в mDTP, то есть мы не передаем actionCreator напрямую*/
export default compose(
    connect(mapStateToProps,{setCurrentPage, getUsers, userUnfollow, userFollow})
)(UsersContainer)