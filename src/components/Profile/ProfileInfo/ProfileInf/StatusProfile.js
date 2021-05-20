import React from "react";

class StatusProfile extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    onStatusChange = (e) => {
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

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }
s

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