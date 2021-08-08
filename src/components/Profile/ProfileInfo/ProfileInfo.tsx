import React, {useState} from "react";
import s from './ProfileInfo.module.css';
import {AvaProfile} from "./ProfileInf/AvaProfile";
import {DescriptionProfile} from "./ProfileInf/DescriptionProfile";
import Preloader from "../../../commons/Preloader/Preloader";
import {StatusProfileWithHooks} from "./ProfileInf/ProfileStatusWiyhHooks";
import {ProfileDescriptionForm} from "./ProfileInf/ProfileDescriptionForm";
import {ProfileUserType} from "../../../types/СommonTypes";

type PropsType = {
  profileUser: ProfileUserType | null
  status: string
  updateStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileUserType) => void
}

const ProfileInfo: React.FC<PropsType> = ({profileUser, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

  const [editMode, setEditMode] = useState(false)

  const goToEditMode = () => setEditMode(true)
  const outToEditMode = () => setEditMode(false)
  const onSubmit = (values: any) => saveProfile(values)

  if (!profileUser) {
    return <Preloader/>
  }
  return (
    <div className={s.profileInfo}>
      <AvaProfile profileUser={profileUser} isOwner={isOwner} savePhoto={savePhoto}/>
      <StatusProfileWithHooks status={status} updateStatus={updateStatus}/>
      {editMode ?
        <ProfileDescriptionForm onSubmit={onSubmit}
                                isOwner={isOwner}
                                outToEditMode={outToEditMode}
        />
        : <DescriptionProfile profileUser={profileUser}
                              isOwner={isOwner}
                              goToEditMode={goToEditMode}/>}
    </div>
  )
}

export default ProfileInfo;