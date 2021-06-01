import { authMe } from "./auth-Reducer";

const INITIALIZED_SUCCESS: string = 'samurai-network/app/INITIALIZED_SUCCESS';

let initialState = { initialized: false }

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true }
        default:
            return state;
    }
}

// === actionCreators === //

export const actions = {
    initializedSuccess: () => ({ type: INITIALIZED_SUCCESS })
}

// === /actionCreators === //

// === thunks === //

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authMe())
    Promise.all([ promise ])
        .then(() => {
            dispatch(actions.initializedSuccess())
        })
}

// === /thunks === //

export default appReducer;