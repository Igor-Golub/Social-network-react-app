import React, {useEffect, useState} from "react";
import {Button, Col, Input, Row} from 'antd';
import {ChatMessage} from "../../api/chat-api";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-Reducer";
import {AppStateType} from "../../redux/redux-store";
import {WS_CHANNEL_STATUS_READY, WS_CHANNEL_EVENT_ERROR} from "../../commons/Constants/Constants";

const ChatPage: React.FC = () => {

  return <Chat/>
}

const Chat: React.FC = () => {

  const dispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status)

  useEffect(() => {
    dispatch(startMessagesListening())
    return () => {
      dispatch(stopMessagesListening())
    }
  }, [])


  return <>
    {status === WS_CHANNEL_EVENT_ERROR
      ? <div>Some error occurred. Please refresh the page.</div>
      : <>
        <Messages/>
        <ChatMessageForm/>
      </>
    }

  </>
}

const Messages = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)

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

const ChatMessageForm = () => {

  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const status = useSelector((state: AppStateType) => state.chat.status)

  const sendKeyMessageHandler = (event: { key: string; }) => {

    if (event.key === 'Enter') {
      dispatch(sendMessage(message))
      setMessage('');
    }
  }

  const sendMessageHandler = () => {
    if (!message) {
      return
    }

    dispatch(sendMessage(message))
    setMessage('');
  }

  return (
    <Row justify='center' align='middle'>
      <Col span={23}>
        <Input placeholder="Basic usage"
               onKeyPress={sendKeyMessageHandler}
               onChange={e => setMessage(e.currentTarget.value)}
               value={message}/>
      </Col>
      <Col span={1}>
        <Button ghost type="primary"
                disabled={status !== WS_CHANNEL_STATUS_READY}
                onClick={sendMessageHandler}>
          Send
        </Button>
      </Col>
    </Row>
  )
}

export default ChatPage;