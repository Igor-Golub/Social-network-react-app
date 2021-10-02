import {
  WS_CHANNEL_EVENT_CLOSE, WS_CHANNEL_EVENT_ERROR,
  WS_CHANNEL_EVENT_MESSAGE, WS_CHANNEL_EVENT_OPEN,
  WS_CHANNEL_STATUS_PENDING, WS_CHANNEL_STATUS_READY,
  WS_WSS_URL
} from "../commons/Constants/Constants";

export type ChatMessageAPI = {
  message: string,
  photo: string,
  userId: number,
  userName: string
}
type EventsNames = 'messages-received' | 'status-changed'
type MessagesReceivedSubscriber = (messages: ChatMessageAPI[]) => void
type StatusChangedSubscriber = (messages: string) => void

const subscribes = {
  'messages-received': [] as MessagesReceivedSubscriber[],
  'status-changed': [] as StatusChangedSubscriber[]
}

let ws: WebSocket | null = null;

const closeHandler = () => {
  notifyAboutStatusGhanged(WS_CHANNEL_STATUS_PENDING)
  setTimeout(createChanel, 3000)
}

const openHandler = () => notifyAboutStatusGhanged(WS_CHANNEL_STATUS_READY)
const errorHandler = () => notifyAboutStatusGhanged(WS_CHANNEL_EVENT_ERROR)

const messageHandler = (event: MessageEvent) => {
  const newMessage = JSON.parse(event.data)
  subscribes["messages-received"].forEach(s => s(newMessage))
}

const cleanUp = () => {
  ws?.removeEventListener(WS_CHANNEL_EVENT_CLOSE, closeHandler)
  ws?.removeEventListener(WS_CHANNEL_EVENT_MESSAGE, messageHandler)
  ws?.removeEventListener(WS_CHANNEL_EVENT_OPEN, openHandler)
  ws?.removeEventListener(WS_CHANNEL_EVENT_ERROR, errorHandler)
  ws?.close()
}

const notifyAboutStatusGhanged = (status: string) => {
  subscribes['status-changed'].forEach(s => s(status))
}

function createChanel() {
  cleanUp()

  ws = new WebSocket(WS_WSS_URL);
  notifyAboutStatusGhanged(WS_CHANNEL_STATUS_PENDING)
  ws?.addEventListener(WS_CHANNEL_EVENT_CLOSE, closeHandler)
  ws?.addEventListener(WS_CHANNEL_EVENT_MESSAGE, messageHandler)
  ws?.addEventListener(WS_CHANNEL_EVENT_OPEN, openHandler)
  ws?.addEventListener(WS_CHANNEL_EVENT_ERROR, errorHandler)
}

export const chatAPI = {
  start() {
    createChanel()
  },
  stop() {
    subscribes['messages-received'] = []
    subscribes['status-changed'] = []
    cleanUp()
  },
  subscribe(eventName: EventsNames, callback: MessagesReceivedSubscriber | StatusChangedSubscriber) {
    // @ts-ignore
    subscribes[eventName].push(callback)

    return () => {
      // @ts-ignore
      subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
    }
  },
  unsubscribe(eventName: EventsNames, callback: MessagesReceivedSubscriber | StatusChangedSubscriber) {
    // @ts-ignore
    subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }

}