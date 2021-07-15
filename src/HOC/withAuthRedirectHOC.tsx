import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

const mapStateToProps = (state: AppStateType) =>
  ({
    isAuth: state.auth.isAuth
  })

type MapSateType = {
  isAuth: boolean
}

type MapDispatchToProps = {
  fake: () => void
}

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapSateType & MapDispatchToProps> = (props) => {
    const {isAuth, fake, ...restProps} = props
    if (!isAuth) return <Redirect to={'/login'}/>

    return <Component {...restProps as WCP}/>
  }

  return connect<MapSateType, MapDispatchToProps, WCP, AppStateType>
  (mapStateToProps, {fake: () => {}})(RedirectComponent)
}