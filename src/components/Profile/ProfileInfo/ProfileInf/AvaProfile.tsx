import React from "react";
import userPhoto from '../../../../assec/images/user.jpg';
import style from './AvaProfile.module.css'
import {ProfileUserType} from "../../../../types/СommonTypes";

type PropsType = {
  profileUser: ProfileUserType
  isOwner: boolean
  savePhoto: (file: File) => void
}


export const AvaProfile: React.FC<PropsType> = ({profileUser, isOwner, savePhoto}) => {

  const onMainPhotoSelected = (event: any) => {
    if (event.target.files.length) {
      savePhoto(event.target.files[0])
    }
  }

  return (
    <>
      <div>
        <img alt='#' src={profileUser.photos.large || userPhoto} className={style.mainPhoto}/>
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
      </div>
    </>
  )
}
