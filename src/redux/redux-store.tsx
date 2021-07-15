import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-Reducer";
import dialogReducer from "./dialogReducer";
import friendsInformationReducer from "./friendsInformationReducer";
import userReducer from "./user-Reducer";
import authReducer from "./auth-Reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import appReducer from "./app-Reducer";

let rootReducer = combineReducers(
    {
        profilePage: profileReducer,
        dialogPage: dialogReducer,
        friendsInformation: friendsInformationReducer,
        usersPage: userReducer,
        auth: authReducer,
        app: appReducer
    }
)

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
export type BaseThunksType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>



// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;