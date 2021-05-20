import React from "react";
import s from './Header.module.css';
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderName from "./HeaderName/HeaderName";
import HeaderLoginContainer from "./HeaderLogin/HeaderLoginContainer";


const Header = () => {
    return (
        <header className={s.header}>
            <HeaderLogo/>
            <HeaderName/>
            <HeaderLoginContainer/>
        </header>
    )
}

export default Header;