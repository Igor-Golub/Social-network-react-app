import profileReducer, {addPost, deletePost} from "./profile-Reducer";

let state = {
    posts: [
        {id: '1', message: 'Hi, I am a good junior react developer!', likes: '15 like'},
        {id: '2', message: 'Oh, it is really cool, because we find good react developer!', likes: '4 like'},
        {id: '3', message: 'Good!!', likes: '0 like'}
    ]
};

it('length of posts should be incremented', () => {
    // Create test data
    const action = addPost('Hello, world')
    // Create action
    const newState = profileReducer(state, action)
    // Expectation
    expect(newState.posts.length).toBe(4);
})

it('after deleting length of messages should be decrement', () => {
    const action = deletePost(1)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(2);
})

it('message of new post should be correct', () => {
    const action = addPost('Hello, world')
    const newState = profileReducer(state, action)
    expect(newState.posts[3].message).toBe('Hello, world');
})

it('message of new post should`t be decrement if id is incorrect', () => {
    const action = deletePost(1000)
    const newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(3);
})


