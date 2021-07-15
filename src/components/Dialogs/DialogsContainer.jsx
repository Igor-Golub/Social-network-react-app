import React from 'react';
import {actions} from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../HOC/withAuthRedirectHOC";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        dialogPage: state.dialogPage
    }
}

const {sendMessage} = actions

export default compose(connect(mapStateToProps, {sendMessage}), withAuthRedirect)(Dialogs)