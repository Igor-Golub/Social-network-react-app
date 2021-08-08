import {usersAPI} from '../api/users-api';
import {ResponseType, ResultCodeEnum} from "../api/api";
import {actions, userFollow, userUnfollow} from "./user-Reducer";

jest.mock('../api/users-api');
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;
const result: ResponseType = {
  resultCode: ResultCodeEnum.Success,
  messages: [],
  data: {},
}

const mockDispatch = jest.fn();
const mockGetState = jest.fn();
userAPIMock.userFollow.mockReturnValue(Promise.resolve(result));
userAPIMock.userUnfollow.mockReturnValue(Promise.resolve(result));

beforeEach(() => {
  mockDispatch.mockClear();
  userAPIMock.userFollow.mockClear();
  userAPIMock.userUnfollow.mockClear();
});

describe('user reducer thunks testing', () => {
  it('success follow thunk', async () => {
    const thunk = userFollow(1);
    await thunk(mockDispatch, mockGetState, {});
    expect(mockDispatch).toBeCalledTimes(3);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(mockDispatch).toHaveBeenNthCalledWith(1, actions.follow(1));
    expect(mockDispatch).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(false, 1));
  });
  it('success unfollow thunk', async () => {
    const thunk = userUnfollow(1);
    await thunk(mockDispatch, mockGetState, {});
    expect(mockDispatch).toBeCalledTimes(3);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
    expect(mockDispatch).toHaveBeenNthCalledWith(1, actions.unfollow(1));
    expect(mockDispatch).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(false, 1));
  });
});