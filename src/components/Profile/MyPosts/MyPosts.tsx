import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import MyPostsForm from "./MyPostsForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {actions} from "../../../redux/profile-Reducer";

const MyPosts: React.FC = () => {

  const dispatch = useDispatch();
  const profilePage = useSelector((state: AppStateType) => state.profilePage)

  const postElement = profilePage.posts.map(post => <Post
    id={post.id}
    message={post.message}
    likes={post.likes}
    key={post.id}/>);

  const onSubmit = (values: any) => {
    dispatch(actions.addPost(values.post));
  }

  return (
    <>
      My post
      <div>
        New post
      </div>
      <MyPostsForm onSubmit={onSubmit}/>
      <div className={s.posts}>
        {postElement}
      </div>
    </>
  )
};

export default MyPosts;