import React from 'react';
import s from './../Dialogs.module.css';

export const MessageItem = ({message}) => {

    return (
        <div className={s.message}>
            <div className={s.messageText}>
                {message}
            </div>
        </div>
    )
};