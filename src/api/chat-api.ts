import {WS_CHANNEL_STATUS_CLOSE, WS_WSS_URL} from "../commons/Constants/Constants";

export type ChatMessage = {
  message: string,
  photo: string,
  userId: number,
  userName: string
}

let subscribes = [] as Array<(messages: ChatMessage[]) => void>

let ws: WebSocket | null = null;

const closeHandler = () => setTimeout(createChanel, 3000)

const messageHandler = (event: MessageEvent) => {
  const newMessage = JSON.parse(event.data)
  subscribes.forEach(s => s(newMessage))
}

function createChanel() {
  ws?.removeEventListener(WS_CHANNEL_STATUS_CLOSE, closeHandler)
  ws?.close()

  ws = new WebSocket(WS_WSS_URL);
  ws?.addEventListener(WS_CHANNEL_STATUS_CLOSE, closeHandler)
  ws?.addEventListener('message', messageHandler)
}

export const chatAPI = {
  start() {
    createChanel()
  },
  stop() {
    subscribes = []
    ws?.removeEventListener(WS_CHANNEL_STATUS_CLOSE, closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.close()
  },
  subscribe(callback: (messages: ChatMessage[]) => void) {
    subscribes.push(callback)

    return () => {
      subscribes = subscribes.filter(s => s !== callback)
    }
  },
  unsubscribe(callback: (messages: ChatMessage[]) => void) {
    subscribes = subscribes.filter(s => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }

}