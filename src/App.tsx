  import './App.css';
import React, {useEffect} from "react";
import Header from './components/Header/Header';
import Navbar from "./components/NavBar/NavBar";
import {BrowserRouter, Redirect, Route} from "react-router-dom"
import Music from "./components/Music/Music";
import Setting from "./components/Setting/Setting";
import News from "./components/News/News";
import TestBlokInformation from "./components/TestBlokInfomation/TestBlokInformation";
import UsersContainer from "./components/Users/UsersContainer";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app-Reducer";
import Preloader from "./commons/Preloader/Preloader";
import {withSuspense} from "./HOC/withSuspenseHOC";
import {AppStateType} from "./redux/redux-store";

const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
//@ts-ignore
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const App = () => {

  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  },[])

  if (!initialized) {
    return <Preloader/>
  }

  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header/>
        <Navbar/>
        <div className='app-wrapper-content'>
          <Route exact path={'/'} render={() => <Redirect to={'/profile'}/>}/>
          <Route path="/dialogs" render={withSuspense(Dialogs)}/>
          <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
          <Route path="/users" render={() => <UsersContainer/>}/>
          <Route path="/setting" render={() => <Setting/>}/>
          <Route path="/music" render={() => <Music/>}/>
          <Route path="/news" render={() => <News/>}/>
          <Route path="/login" render={() => <Login/>}/>
        </div>
        <TestBlokInformation/>
      </div>
    </BrowserRouter>
  )
}

export default App