import React from "react";
import Profile from './Profile';
import {connect} from "react-redux";
import {addPost, getStatus, getUsersProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-Reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";

class ProfileAPIContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profileUser}
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

const mapStateToProps = (state) => {
    return {
        profileUser: state.profilePage.profileUser,
        profileStatus: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose(connect
    (mapStateToProps, {addPost, getUsersProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)
(ProfileAPIContainer)


