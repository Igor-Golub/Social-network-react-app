import * as yup from "yup";
import {Formik} from "formik";
import React from "react";

const PostsForm = (props) => {
    const validationsSchema = yup.object().shape({
        post: yup.string().typeError('Must be sting').required('Necessarily')
    })
    return (
        <div>
            <Formik initialValues={
                {
                    post: ''
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
                            <div>
                                <input
                                    type="textarea"
                                    name={'post'}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.post}
                                    placeholder={'Written your post'}
                                />
                                {touched.post && errors.post && <p>{errors.post}</p>}
                            </div>
                            <div>
                                <button
                                    disabled={!isValid && !dirty}
                                    onClick={handleSubmit}
                                    type={'submit'}
                                >Add post
                                </button>
                            </div>
                        </div>
                    )
                }
            </Formik>
        </div>
    );
}

export default PostsForm;