import React from "react";
import s from './Post.module.css';


const Post = (props) => {
    return (
        <div className={s.item}>
            <img alt='#' src='https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg' />
            {props.message}
            <div>
                {props.likes}
            </div>
        </div>
    )
}

export default Post;