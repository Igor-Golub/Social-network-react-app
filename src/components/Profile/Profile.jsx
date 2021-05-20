import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = ({profileUser, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
    return (
        <div className={s.profileWrapper}>
            <ProfileInfo profileUser={profileUser}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
                         isOwner={isOwner}
                         status={status}
                         updateStatus={updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;
