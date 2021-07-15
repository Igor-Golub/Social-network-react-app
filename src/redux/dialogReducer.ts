import {InferActionsType} from "./redux-store";

const SEND_MESSAGE: string = 'samurai-network/dialog/SEND-MESSAGE';

export type DialogsType = { id: string, name: string }
export type MessagesType = { id: string, message: string }
type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>

const initialState = {
    dialogs: [
        {id: '1', name: 'Dimych'},
        {id: '2', name: 'Sveta'},
        {id: '3', name: 'Victor'},
        {id: '4', name: 'Lisua'},
        {id: '5', name: 'Valera'},
        {id: '6', name: 'Vlad'}
    ] as Array<DialogsType>,
    messages: [
        {id: '1', message: 'Hi!'},
        {id: '2', message: 'How are you?'},
        {id: '3', message: 'What about looking for new job?'},
        {id: '4', message: 'Hi gues!'},
        {id: '5', message: 'Good buy'},
        {id: '6', message: 'Hi!'}
    ] as Array<MessagesType>
};

const dialogReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {id: '7', message: action.message}
            return { ...state, messages: [...state.messages, newMessage] }
        default:
            return state;
    }
}

export const actions = {
    sendMessage: (message: string) => ( { type: SEND_MESSAGE, message } as const)
}

export default dialogReducer;