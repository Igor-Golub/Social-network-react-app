import userReducer, {actions, initialState, InitialStateType} from "./user-Reducer";

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {id: 0, name: 'Igor 0', followed: false, photos: {small: null, large: null}, status: 'status 0'},
      {id: 1, name: 'Igor 1', followed: false, photos: {small: null, large: null}, status: 'status 1'},
      {id: 2, name: 'Igor 2', followed: true, photos: {small: null, large: null}, status: 'status 2'},
      {id: 3, name: 'Igor 3', followed: true, photos: {small: null, large: null}, status: 'status 3'},
    ],
    pageSize: 6,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingProgress: []
  };
})
describe('testing user reducer', () => {
  it('should return default state', () => {
    //@ts-ignore
    expect(userReducer(initialState, {type: 'someType', payload: 'somePayload'})).toEqual(initialState);
  });

  it('should change or not user status following', () => {
    const newState = userReducer(state, actions.follow(1))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
  })

  it('should change user status following from unfollow', () => {
    const newState = userReducer(state, actions.unfollow(2))
    expect(newState.users[1].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeFalsy();
  })
});