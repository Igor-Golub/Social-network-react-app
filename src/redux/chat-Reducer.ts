import {BaseThunksType, InferActionsType} from "./redux-store";
import {chatAPI, ChatMessage} from "../api/chat-api";
import {Dispatch} from "redux";

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunksType = BaseThunksType<ActionsType>

const initialState = {messages: [] as ChatMessage[]}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/social-network/RECEIVED_MESSAGES':
      return {...state, messages: [...state.messages, ...action.payload.message]}
    default:
      return state;
  }
}

export const actions = {
  messagesReceived: (message: ChatMessage[]) => ({
    type: 'app/social-network/RECEIVED_MESSAGES',
    payload: {message}
  } as const)
}

let _newMessageHandler: ((message: ChatMessage[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = message => dispatch(actions.messagesReceived(message));
  }

  return _newMessageHandler;
}

export const startMessagesListening = (): ThunksType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe(newMessageHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunksType => async (dispatch) => {
  chatAPI.stop()
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
}

export const sendMessage = (message: string): ThunksType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;