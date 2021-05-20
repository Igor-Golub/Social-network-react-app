const SEND_MESSAGE: string = 'samurai-network/dialog/SEND-MESSAGE';

type InitialStateType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}
export type DialogsType = { id: string, name: string }
export type MessagesType = { id: string, message: string }

const initialState: InitialStateType = {
    dialogs: [
        {id: '1', name: 'Dimych'},
        {id: '2', name: 'Sveta'},
        {id: '3', name: 'Victor'},
        {id: '4', name: 'Lisua'},
        {id: '5', name: 'Valera'},
        {id: '6', name: 'Vlad'}
    ],
    messages: [
        {id: '1', message: 'Hi!'},
        {id: '2', message: 'How are you?'},
        {id: '3', message: 'What about looking for new job?'},
        {id: '4', message: 'Hi gues!'},
        {id: '5', message: 'Good buy'},
        {id: '6', message: 'Hi!'}
    ]
};

const dialogReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {id: '7', message: action.message}
            return { ...state, messages: [...state.messages, newMessage] }
        default:
            return state;
    }
}

// === actionCreators === //

type ActionsTypes = SendMessageActionType

type SendMessageActionType = { type: typeof SEND_MESSAGE, message: string }
export const sendMessage = (message: string): SendMessageActionType => ( { type: SEND_MESSAGE, message })

// === /actionCreators === //

export default dialogReducer;