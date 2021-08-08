import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileUserType} from "../../types/СommonTypes";
import MyPosts from "./MyPosts/MyPosts";

type PropsType = {
  profileUser: ProfileUserType | null,
  status: string,
  updateStatus: (status: string) => void,
  isOwner: boolean,
  savePhoto: (file: File) => void,
  saveProfile: (profile: ProfileUserType) => void
}

const Profile: React.FC<PropsType> = ({profileUser, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

  return (
    <div className={s.profileWrapper}>
      <ProfileInfo profileUser={profileUser}
                   savePhoto={savePhoto}
                   saveProfile={saveProfile}
                   isOwner={isOwner}
                   status={status}
                   updateStatus={updateStatus}/>
      <MyPosts/>
    </div>
  )
};

export default Profile;
