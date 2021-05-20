import React from "react";
import s from './Profile.module.css';
import {NavLink} from "react-router-dom";


const Profile = (props) => {
    return (
        <div className={s.navItem}>
            <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
        </div>
    )
}

export default Profile;