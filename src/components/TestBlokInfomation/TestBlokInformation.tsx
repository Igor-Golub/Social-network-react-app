import React from "react";
import s from './TestBlokInformation.module.css';
import TitleFriends from "./TitleTBIFriends/TitleFriends";
import ContentFriends from "./ContentTBIFriends/ContentFriends";



const TestBlokInformation:React.FC = () => {
    return (
        <div className={s.TBIWrapper}>
            <TitleFriends/>
            <ContentFriends />
        </div>
    )
}

export default TestBlokInformation;