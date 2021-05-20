import * as yup from "yup";
import s from "./Dialogs.module.css";
import {Formik} from "formik";
import React from "react";

const SendMessageForm = (props) => {
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
                    onSubmit={props.onSubmit}
            >
                {
                    ({
                         values,
                         errors,
                         touched,
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
                                {touched.textarea && errors.textarea && <p>{errors.textarea}</p>}
                            </div>
                            <div className={s.buttonWrapper}>
                                <button
                                    className={s.buttonSendMessage}
                                    disabled={!isValid && !dirty}
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