import { authMe } from "./auth-Reducer";

const INITIALIZED_SUCCESS: string = 'samurai-network/app/INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}
let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return { ...state, initialized: true }
        default:
            return state;
    }
}

// === actionCreators === //

type ActionsType = initializedSuccessActionType

type initializedSuccessActionType = ({ type: typeof INITIALIZED_SUCCESS })
export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

// === /actionCreators === //

// === thunks === //

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authMe())
    Promise.all([ promise ])
        .then(() => {
            dispatch(initializedSuccess())
        })
}

// === /thunks === //

export default appReducer;