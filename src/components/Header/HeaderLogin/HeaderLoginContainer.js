import React from 'react'
import HeaderLogin from "./HeaderLogin";
import {connect} from "react-redux";
import {authLogout} from "../../../redux/auth-Reducer";

class HeaderLoginContainer extends React.Component {

    render() {
        return <HeaderLogin {...this.props}/>
    }

}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, {authLogout})(HeaderLoginContainer);
