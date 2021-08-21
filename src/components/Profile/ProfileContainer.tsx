import React from "react";
import Profile from './Profile';
import {connect} from "react-redux";
import {getStatus, getUsersProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-Reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileUserType} from "../../types/СommonTypes";

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchType = {
  getUsersProfile: (userId: number | null) => void
  getStatus: (userId: number | null) => void
  updateStatus: (status: string) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileUserType) => void
}

type PathParamsType = { userId: string }
type PropsType = MapPropsType & MapDispatchType & RouteComponentProps<PathParamsType>

class ProfileAPIContainer extends React.Component<PropsType> {

  refreshProfile() {
    let userId: number | null = +this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.getUsersProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return (
      <div>
        <Profile {...this.props}
                 isOwner={!this.props.match.params.userId}
                 status={this.props.profileStatus}
                 updateStatus={this.props.updateStatus}
                 savePhoto={this.props.savePhoto}
                 saveProfile={this.props.saveProfile}
        />

      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    profileStatus: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
  }
}

export default compose(connect
  (mapStateToProps, {getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile}),
  withRouter
)
(ProfileAPIContainer)


