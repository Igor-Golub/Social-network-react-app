import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {MessageItem} from "./MessageItem/MessageItem";
import SendMessageForm from "./DialogsForm";

const Dialogs = ({ dialogPage, sendMessage }) => {

    let dialogElements =
        dialogPage.dialogs.map((dialogs) => <DialogItem
            name={dialogs.name}
            key={dialogs.id}
            id={dialogs.id}
        />);

    let messageElements =
        dialogPage.messages.map((messages) => <MessageItem
            message={messages.message}
            key={messages.id}
            id={messages.id}
        />);

    let onSubmit = values => { sendMessage(values.message) }

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