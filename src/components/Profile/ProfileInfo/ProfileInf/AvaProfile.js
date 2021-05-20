import React from "react";
import userPhoto from '../../../../assec/images/user.jpg';
import style from './AvaProfile.module.css'

export const AvaProfile = ({profileUser, isOwner, savePhoto}) => {

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (
        <div>
            <div>
                <img alt='#' src={profileUser.photos.large || userPhoto} className={style.mainPhoto}/>
                {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
            </div>
        </div>
    )
}
