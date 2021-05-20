import React from "react";
import s from './NavBar.module.css';
import Messages from "./Mesages/Messages";
import News from "./News/News";
import Music from "./Music/Music";
import Setting from "./Setting/Setting";
import Profile from "./Profile/Profile";
import Users from "./Users/Users";

const Navbar = () => {
    return (
        <div className={s.nav}>
                <Profile/>
                <Messages/>
                <News/>
                <Users/>
                <Music/>
                <Setting/>
        </div>
    )
}

export default Navbar;