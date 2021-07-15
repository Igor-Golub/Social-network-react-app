import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import SendMessageForm from "./DialogsForm";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {actions} from "../../redux/dialogReducer";

export type NewMessage = {message: string}

const Dialogs: React.FC = () => {

    const dialogPage = useSelector((state: AppStateType) => state.dialogPage)
    const dispatch = useDispatch()

    const dialogElements =
        dialogPage.dialogs.map(dialogs => <DialogItem
            id={dialogs.id}
            name={dialogs.name}
            key={dialogs.id}
        />);

    const messageElements =
        dialogPage.messages.map(messages => <MessageItem
            //id={messages.id}
            message={messages.message}
            key={messages.id}
        />);

    const onSubmit = (values: NewMessage) => {
        dispatch(actions.sendMessage(values.message))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsWrapper}>
                <div className={s.dialogsItems}>
                    {dialogElements}
                </div>
            </div>
            <div className={s.messagesWrapper}>
                <div className={s.messagesItems}>
                    {messageElements}
                </div>
            </div>
            <SendMessageForm onSubmit={onSubmit}/>
        </div>
    )
};


export default Dialogs;