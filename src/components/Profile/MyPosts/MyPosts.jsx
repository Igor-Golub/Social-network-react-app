import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import MyPostsForm from "./MyPostsForm";


const MyPosts = React.memo((props) => {

    let postElement = props.profilePage.posts.map(post => <Post
        id={post.id}
        message={post.message}
        likes={post.likes}
        key={post.id}/>);

    let onSubmit = (values) => {
        props.addPost(values.post);
    }

    return (
        <div>
            My post
            <div>
                New post
            </div>
            <MyPostsForm onSubmit={onSubmit}/>
            <div className={s.posts}>
                {postElement}
            </div>
        </div>
    )
});

export default MyPosts;