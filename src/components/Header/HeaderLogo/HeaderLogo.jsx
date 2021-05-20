import React from "react";
import s from './HeaderLogo.module.css';


const HeaderLogo = () => {
    return (
        <div className={s.headerLogo}>
            <img alt={'#'} src="https://png.pngtree.com/png-vector/20191021/ourlarge/pngtree-black-feather-vector-logo-design-png-image_1840012.jpg"/>
        </div>
    )
}

export default HeaderLogo;