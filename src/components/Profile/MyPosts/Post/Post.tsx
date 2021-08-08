import React from "react";
import s from './Post.module.css';

type PropsType = {
  id: string
  message: string
  likes: string
  key: string
}

const Post: React.FC<PropsType> = ({message, likes}) => {
  return (
    <div className={s.item}>
      <img alt='#'
           src='https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg'/>
      {message}
      <div>
        {likes}
      </div>
    </div>
  )
}

export default Post;