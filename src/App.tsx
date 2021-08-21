import './App.css';
import 'antd/dist/antd.css'
import React, {useEffect} from "react";
import Header from './components/Header/Header';
import {Link, Redirect, Route} from "react-router-dom"
import {UsersPage} from "./components/Users/UsersPage";
import {LoginPage} from "./components/Login/LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/app-Reducer";
import Preloader from "./commons/Preloader/Preloader";
import {withSuspense} from "./HOC/withSuspenseHOC";
import {AppStateType} from "./redux/redux-store";
import {PATH_CHAT, PATH_DIALOGS, PATH_LOGIN, PATH_USERS} from "./commons/Constants/Constants";

import {Layout, Menu, Breadcrumb} from 'antd';
import {GitlabFilled, QqCircleFilled, MessageFilled} from '@ant-design/icons';

const DialogsPage = React.lazy(() => import('./components/Dialogs/Dialogs'));
const ChatPage = React.lazy(() => import('./pages/chat/ChatPage'));
// @ts-ignore
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

const App = () => {

  const {SubMenu} = Menu;
  const {Content, Footer, Sider} = Layout;

  const initialized = useSelector((state: AppStateType) => state.app.initialized)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!initialized) {
    return <Preloader/>
  }

  return (
    <Layout>
      <Header/>
      <Content style={{padding: '0 50px'}}>
        <Breadcrumb style={{margin: '16px 0'}}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout className="site-layout-background" style={{padding: '24px 0'}}>
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{height: '100%'}}
            >
              <SubMenu key="sub1" icon={<GitlabFilled />} title="Profile">
                <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                <Menu.Item key="2"><Link to={PATH_DIALOGS}>Messages</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<QqCircleFilled />} title="Users">
                <Menu.Item key="5"> <Link to={PATH_USERS}>Users</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<MessageFilled />} title="Chat">
                <Menu.Item key="6"> <Link to={PATH_CHAT}>Users</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Content style={{padding: '0 24px', minHeight: 280}}>
            <Route exact path={'/'} render={() => <Redirect to={'/profile'}/>}/>
            <Route path={PATH_DIALOGS}  render={withSuspense(DialogsPage)}/>
            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
            <Route path={PATH_USERS} render={() => <UsersPage/>}/>
            <Route path={PATH_LOGIN} render={() => <LoginPage/>}/>
            <Route path={PATH_CHAT} render={withSuspense(ChatPage)}/>
          </Content>
        </Layout>
      </Content>
      <Footer style={{textAlign: 'center'}}>Project ©2021 Created by Frontend developer</Footer>
    </Layout>
  )
}

export default App