import React from "react";
// import {updateStatus} from "../../../../redux/profile-Reducer";
// import {useDispatch} from "react-redux";
//
//
// const StatusProfile: React.FC<PropsType> = ({status}) => {
//
//     const dispatch = useDispatch()
//
//     const [editMode, setEditMode] = useState(false)
//     const [localStatus, setLocalStatus] = useState('')
//
//   const onStatusChange = (event: any) => {
//     setLocalStatus(event.currentTarget.value)
//   }
//
//   const activeEditMode = () => setEditMode(true)
//   const deActiveEditMode = () => {
//     setEditMode(false)
//       dispatch(updateStatus(localStatus));
//   }
//
//   useEffect(() => {
//     setLocalStatus(status)
//   }, [status, localStatus])
//
//   return (
//     <div>
//       <div>
//         {!editMode &&
//         <div>
//           <span onDoubleClick={activeEditMode}>{status || 'No status'}</span>
//         </div>}
//         {editMode &&
//         <div>
//           <input onChange={onStatusChange} autoFocus={true} onBlur={deActiveEditMode} value={localStatus}/>
//         </div>}
//       </div>
//     </div>
//   )
// }
//
// export default StatusProfile;

type PropsType = {
  status: string
  updateStatus: (status: string) => void
}

class StatusProfile extends React.Component<PropsType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    onStatusChange = (e: any) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    activeEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActiveEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    render() {
        return (
            <div>
                <div>
                    {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activeEditMode}>{this.props.status || 'No status'}</span>
                    </div>}
                    {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActiveEditMode} value={this.state.status}/>
                    </div>}
                </div>
            </div>
        )
    }
}

export default StatusProfile;