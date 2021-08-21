import React, {useEffect, useState} from "react";
import {Button, Col, Input, Row} from 'antd';
import {
  WS_CHANNEL_STATUS_CLOSE,
  WS_CHANNEL_STATUS_PENDING,
  WS_CHANNEL_STATUS_READY,
  WS_WSS_URL
} from "../../commons/Constants/Constants";

type ChatMessage = {
  message: string,
  photo: string,
  userId: number,
  userName: string
}

const ChatPage: React.FC = () => {

  return <Chat/>
}

const Chat: React.FC = () => {

  const [WS, setWS] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;

    const closeHandler = () => setTimeout(createChanel, 3000)

    function createChanel() {
      ws?.removeEventListener(WS_CHANNEL_STATUS_CLOSE, closeHandler)
      ws?.close()

      ws = new WebSocket(WS_WSS_URL);
      ws?.addEventListener(WS_CHANNEL_STATUS_CLOSE, closeHandler)
      setWS(ws);
    }

    createChanel()

    return () => {
      ws.removeEventListener(WS_CHANNEL_STATUS_CLOSE, closeHandler)
      ws.close();
    }
  }, [])

  return <>
    <Messages WS={WS}/>
    <ChatMessageForm WS={WS}/>
  </>
}

const Messages: React.FC<{ WS: WebSocket | null }> = ({WS}) => {

  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => setMessages(prev => [...prev, ...JSON.parse(event.data)])
    WS?.addEventListener('message', messageHandler)

    return () => WS?.removeEventListener('message', messageHandler)
  }, [WS])

  return <>
    {messages.map((message, index) => <Message key={index} message={message}/>)}
  </>
}

const Message: React.FC<{ message: ChatMessage }> = ({message}) => {

  return <>
    <img src={message.photo} style={{width: '30px', borderRadius: '100%'}}/> <b>{message.userName}</b>
    <br/>
    {message.message}
    <hr/>
  </>
}

const ChatMessageForm: React.FC<{ WS: WebSocket | null }> = ({WS}) => {

  const [message, setMessage] = useState('');
  const [channelStatus, setChannelStatus] = useState(WS_CHANNEL_STATUS_PENDING);

  useEffect(() => {
    const openHandler = () => {
      setChannelStatus(WS_CHANNEL_STATUS_READY);
    }
    WS?.addEventListener('open', openHandler)

    return () => {
      WS?.removeEventListener('open', openHandler)
    }
  }, [])

  const sendKeyMessage = (event: { key: string; }) => {

    if (event.key === 'Enter') {
      WS?.send(message)
      setMessage('');
    }
  }

  const sendMessage = () => {
    if (!message) {
      return
    }

    WS?.send(message)
    setMessage('');
  }

  return (
    <Row justify='center' align='middle'>
      <Col span={23}>
        <Input placeholder="Basic usage"
               onKeyPress={sendKeyMessage}
               onChange={e => setMessage(e.currentTarget.value)}
               value={message}/>
      </Col>
      <Col span={1}>
        <Button ghost type="primary"
                disabled={WS === null && channelStatus !== WS_CHANNEL_STATUS_READY}
                onClick={sendMessage}>
          Send
        </Button>
      </Col>
    </Row>
  )
}

export default ChatPage;