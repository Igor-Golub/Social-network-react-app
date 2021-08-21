import React from "react";
import {Button, Col, Layout, Menu, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authLogout} from "../../redux/auth-Reducer";
import {Link} from "react-router-dom";

const Header: React.FC = () => {

  const dispatch = useDispatch()
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  const {Header} = Layout;

  const logout = () => dispatch(authLogout());

  return (
    <Header className="header">
      <div className="logo"/>
      <Row justify='center' align='middle'>
        <Col span={23}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
          </Menu>
        </Col>

        {isAuth
          ? <Col span={1}> <Button ghost onClick={logout}>Logout</Button> </Col>
          : <Col span={1}> <Button> <Link to={'/login'}>Login</Link> </Button> </Col>
        }
      </Row>
    </Header>)
}

export default Header;