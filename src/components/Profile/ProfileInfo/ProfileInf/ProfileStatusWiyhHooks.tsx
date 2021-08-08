import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
  updateStatus: (status: string) => void
  status: string
}

export const StatusProfileWithHooks: React.FC<PropsType> = ({updateStatus, status}) => {

  const [editMode, setEditMode] = useState(false)
  const [localStatus, setStatus] = useState(status)

  useEffect(() => {
    setStatus(status);
  }, [status])

  const activateEditMode = () => setEditMode(true)
  const deActiveEditMode = () => {
    setEditMode(false)
    updateStatus(localStatus)
  }
  const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => setStatus(event.currentTarget.value)

  return (
    <div>
      <div>
        {!editMode &&
        <div>
          <span onDoubleClick={activateEditMode}>{status || 'No status'}</span>
        </div>}
        {editMode &&
        <div>
          <input onChange={onStatusChange} autoFocus={true} onBlur={deActiveEditMode} value={status}/>
        </div>}
      </div>
    </div>
  )
}