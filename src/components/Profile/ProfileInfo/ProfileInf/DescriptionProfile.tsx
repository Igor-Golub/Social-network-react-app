import React from "react";
import {ProfileUserType} from "../../../../types/СommonTypes";

type PropsType = {
  profileUser: ProfileUserType
  isOwner: boolean
  goToEditMode: () => void
}

export const DescriptionProfile: React.FC<PropsType> = ({profileUser, isOwner, goToEditMode}) => {
  return (
    <>
      {isOwner && <div>
        <button onClick={goToEditMode}>Edit</button>
      </div>}
      <div>
        <div>
          <b>Full name</b>: {profileUser.fullName}
        </div>
        <div>
          <b>Looking for a job</b>: {profileUser.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profileUser.lookingForAJob && <div>
          My professional skills: {profileUser.lookingForAJobDescription}
        </div>}
        <div>
          <b>AboutMe</b>: {profileUser.aboutMe}
        </div>
      </div>
    </>
  )
}