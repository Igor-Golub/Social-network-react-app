import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfileUserType} from "../../types/СommonTypes";
import MyPosts from "./MyPosts/MyPosts";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type PropsType = {
  status: string,
  updateStatus: (status: string) => void,
  isOwner: boolean,
  savePhoto: (file: File) => void,
  saveProfile: (profile: ProfileUserType) => void
}

const Profile: React.FC<PropsType> = ({ status, updateStatus, isOwner, savePhoto, saveProfile}) => {

  const profileUser = useSelector((state: AppStateType) => state.profilePage.profileUser )

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
