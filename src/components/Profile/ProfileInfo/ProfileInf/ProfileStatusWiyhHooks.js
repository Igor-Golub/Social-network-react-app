import React, {useEffect, useState} from "react";

export const StatusProfileWithHooks = ({ updateStatus, ...props}) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const activateEditMode = () => setEditMode(true)
    const deActiveEditMode = () => {
        setEditMode(false)
        updateStatus(status)
    }
    const onStatusChange = (event) => setStatus(event.currentTarget.value)

    return (
        <div>
            <div>
                { !editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || 'No status'}</span>
                </div>}
                { editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deActiveEditMode} value={status}/>
                </div>}
            </div>
        </div>
    )
}