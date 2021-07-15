import { authMe } from "./auth-Reducer";
import {InferActionsType} from "./redux-store";

const initialState = { initialized: false }

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'app/social-network/INITIALIZED_SUCCESS':
            return { ...state, initialized: true }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({ type: 'app/social-network/INITIALIZED_SUCCESS' } as const)
}

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