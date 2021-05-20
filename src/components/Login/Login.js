import React from "react";
import LoginForm from "./LoginForm";
import {connect} from "react-redux";
import {authLogin, authLogout} from "../../redux/auth-Reducer";
import {Redirect} from "react-router-dom";


const Login = ({authLogin, isAuth, captchaUrl}) => {

    const onSubmit = (values) => {
        console.log(values)
        authLogin(values.email, values.password, values.rememberMe, values.captchaUrl)
    }

    if (isAuth) {
        return <Redirect to='/profile'/>
    }

    return <div>
        <h1>Login</h1>
        <LoginForm captchaUrl={captchaUrl} onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => (
    {
        captchaUrl: state.auth.captchaUrl,
        isAuth: state.auth.isAuth
    }
)

export default connect(mapStateToProps, {authLogin, authLogout})(Login);