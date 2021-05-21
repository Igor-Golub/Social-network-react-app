import React from "react";
import s from './HeaderName.module.css';


const HeaderName: React.FC = () => {
    return (
        <div className={s.headerName}>
           <h3>Social Network</h3>
        </div>
    )
}

export default HeaderName;