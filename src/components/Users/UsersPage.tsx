import React from "react";
import {useSelector} from "react-redux";
import {Users} from "./Users";
import Preloader from "../../commons/Preloader/Preloader";
import {AppStateType} from "../../redux/redux-store";

export const UsersPage: React.FC = () => {

  const isFetching = useSelector((state: AppStateType) => state.usersPage.isFetching)

  return <>
    { isFetching ? <Preloader/> : null }
    <Users />
  </>
}