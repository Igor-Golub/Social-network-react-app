import React from "react";
import LoginForm from "./LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {authLogin} from "../../redux/auth-Reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

export const LoginPage = () => {

  const dispatch = useDispatch()
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  const onSubmit = (values: any) => {
    dispatch(authLogin(values.email, values.password, values.rememberMe, values.captchaUrl))
  }

  if (isAuth) {
    <Redirect to='/profile'/>
  }

  return <div>
    <h1>Login</h1>
    <LoginForm captchaUrl={captchaUrl} onSubmit={onSubmit}/>
  </div>
}
