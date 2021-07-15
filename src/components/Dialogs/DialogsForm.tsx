import * as yup from "yup";
import s from "./Dialogs.module.css";
import {Formik} from "formik";
import React from "react";
import {NewMessage} from "./Dialogs";

type PropsType = {
    onSubmit: (value: NewMessage) => void
}

const SendMessageForm: React.FC<PropsType> = ({onSubmit}) => {
    const validationsSchema = yup.object().shape({
        message: yup.string().typeError('Must be sting').required('Necessarily')
    })
    return (
        <div className={s.messagesSendWrapper}>
            <Formik initialValues={
                {
                    message: ''
                }
            }
                    validationSchema={validationsSchema}
                    validateOnBlur
                    onSubmit={onSubmit}
            >
                {
                    ({
                         values,
                         handleChange,
                         handleBlur,
                         isValid,
                         handleSubmit,
                         dirty,
                     }) => (
                        <div>
                            <div className={s.textareaWrapper}>
                                {/* <label htmlFor={`message`}></label><br/>*/}
                                <input
                                    type="textarea"
                                    name={'message'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.message}
                                    placeholder={'enter message'}
                                />
                            </div>
                            <div className={s.buttonWrapper}>
                                <button
                                    className={s.buttonSendMessage}
                                    disabled={!isValid && !dirty}
                                    //@ts-ignore
                                    onClick={handleSubmit}
                                    type={'submit'}
                                >Send message
                                </button>
                            </div>
                        </div>
                    )
                }
            </Formik>
        </div>
    );
}

export default SendMessageForm;