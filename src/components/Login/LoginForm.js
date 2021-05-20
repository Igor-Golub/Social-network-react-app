import * as yup from "yup";
import {Formik} from "formik";
import React from "react";

const LoginForm = ({onSubmit, captchaUrl}) => {
    const validationsSchema = yup.object().shape({
        password: yup.string().typeError('Must be sting').required('Necessarily'),
        email: yup.string().email('Enter correct email'),
        captcha: yup.string().typeError('Must be sting')
    })
    return (
        <Formik initialValues={
            {
                password: '',
                email: '',
                checkbox: false,
                captchaUrl: ''
            }
        }
                validationSchema={validationsSchema}
                validateOnBlur
                onSubmit={onSubmit}
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
                        <div>
                            <label htmlFor={`email`}>Email</label><br/>
                            <input
                                type='email'
                                name={'email'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder={'ivan@gmail.com'}
                            />
                            {touched.email && errors.email && <p>{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor={`password`}>Пароль</label><br/>
                            <input
                                type="password"
                                name={'password'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder={'Пароль'}
                            />
                            {touched.password && errors.password && <p>{errors.password}</p>}
                        </div>
                        <div>
                            <input
                                type='checkbox'
                                name={'rememberMe'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.rememberMe}
                            />
                            <label htmlFor={`rememberMe`}>Remember me</label><br/>
                        </div>
                        {captchaUrl && <img alt={'#'} src={captchaUrl}/>}
                        {captchaUrl && <div>
                            <input
                                type='input'
                                name={'captchaUrl'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.captchaUrl}
                            />
                            {touched.captchaUrl && errors.captchaUrl && <p>{errors.captchaUrl}</p>}
                        </div>}
                        <br/>
                        <button
                            disabled={!isValid && !dirty}
                            onClick={handleSubmit}
                            type={'submit'}
                        >Login
                        </button>
                    </div>
                )
            }
        </Formik>
    );
}

export default LoginForm;