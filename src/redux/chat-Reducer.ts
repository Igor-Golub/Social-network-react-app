import {BaseThunksType, InferActionsType} from "./redux-store";
import {chatAPI, ChatMessageAPI} from "../api/chat-api";
import {Dispatch} from "redux";
import { WS_CHANNEL_STATUS_READY } from "../commons/Constants/Constants";
import {v1} from 'uuid';

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunksType = BaseThunksType<ActionsType>
type ChatMessage = ChatMessageAPI & {id: string}

const initialState = {
  messages: [] as ChatMessage[],
  status: WS_CHANNEL_STATUS_READY
}

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'app/social-network/RECEIVED_MESSAGES':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages
          .map(m => ({...m, id: v1() }))]
          .filter((m, index, arr) => index >= arr.length - 100)
      }
    case 'app/social-network/STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status
      }
    default:
      return state;
  }
}

export const actions = {
  messagesReceived: (messages: ChatMessageAPI[]) => ({
    type: 'app/social-network/RECEIVED_MESSAGES',
    payload: {messages}
  } as const),
  statusChanged: (status: string) => ({
    type: 'app/social-network/STATUS_CHANGED',
    payload: {status}
  } as const)
}

let _newMessageHandler: ((message: ChatMessageAPI[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = message => dispatch(actions.messagesReceived(message));
  }

  return _newMessageHandler;
}

let _statusChangedHandler: ((status: string) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = status => dispatch(actions.statusChanged(status));
  }

  return _statusChangedHandler;
}

export const startMessagesListening = (): ThunksType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunksType => async (dispatch) => {
  chatAPI.stop()
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const sendMessage = (message: string): ThunksType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;