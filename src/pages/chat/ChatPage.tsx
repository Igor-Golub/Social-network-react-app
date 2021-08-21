import React, {useEffect, useState} from "react";
import {Button, Col, Input, Row} from 'antd';

const WS = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

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

  return <>
    <Messages/>
    <ChatMessageForm/>
  </>
}

const Messages: React.FC = () => {

  const [messages, setMessages] = useState<ChatMessage[]>([])

  useEffect(() => {
    WS.addEventListener(
      'message',
      (event: MessageEvent) => setMessages(prev => [...prev, ...JSON.parse(event.data)]))
  }, [])

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

const ChatMessageForm: React.FC = () => {

  const [message, setMessage] = useState('');

  const sendMessage = (event: any) => {
    if (!message) {
      return
    }

    if (event.key === 'Enter') {
      WS.send(message)
      setMessage('');
    }

    WS.send(message)
    setMessage('');
  }

  return (
    <Row justify='center' align='middle'>
      <Col span={23}>
        <Input placeholder="Basic usage" onKeyPress={sendMessage} onChange={e => setMessage(e.currentTarget.value)} value={message}/>
      </Col>
      <Col span={1}>
        <Button ghost type="primary" onClick={sendMessage}>Send</Button>
      </Col>
    </Row>
  )
}

export default ChatPage;