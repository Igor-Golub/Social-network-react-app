import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-Reducer";
import dialogReducer from "./dialogReducer";
import friendsInformationReducer from "./friendsInformationReducer";
import userReducer from "./user-Reducer";
import authReducer from "./auth-Reducer";
import thunkMiddleware from "redux-thunk";
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

// для того чтобы получить глобальный type для state
type RootReducerType = typeof rootReducer
// используется специпльная f ReturnType в которыю предаю RootReducerType для динамического добавления type reducers
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;