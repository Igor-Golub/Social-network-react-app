import React from "react";
import * as yup from "yup";
import {Formik} from "formik";

type PropsType = {
  isOwner: boolean
  outToEditMode: () => void
  onSubmit: (value: any) => void
}

export const ProfileDescriptionForm:React.FC<PropsType> = ({isOwner, outToEditMode, onSubmit}) => {
  const validationsSchema = yup.object().shape({
    facebook: yup.string().typeError('Must be sting'),
    website: yup.string().typeError('Must be sting')
  })
  return (
    <div>
      {isOwner && <div>
        <button onClick={outToEditMode}>Out</button>
      </div>}
      <Formik initialValues={
        {
          fullName: '',
          lookingForAJob: '',
          lookingForAJobDescription: '',
          aboutMe: ''
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
             dirty,
           }) => (
            <div>
              <p>
                <label htmlFor={`fullName`}>fullName</label><br/>
                <input
                  type='input'
                  name={'fullName'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullName}
                  placeholder={'add your fullName'}
                />
                {touched.fullName && errors.fullName && <p>{errors.fullName}</p>}
              </p>
              <p>
                <label htmlFor={`lookingForAJob`}>lookingForAJob</label><br/>
                <input
                  type='checkbox'
                  name={'lookingForAJob'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lookingForAJob}
                />
                {touched.lookingForAJob && errors.lookingForAJob && <p>{errors.lookingForAJob}</p>}
              </p>
              <p>
                <label htmlFor={`lookingForAJobDescription`}>lookingForAJobDescription</label><br/>
                <input
                  type='input'
                  name={'lookingForAJobDescription'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lookingForAJobDescription}
                />
                {touched.lookingForAJobDescription && errors.lookingForAJobDescription &&
                <p>{errors.lookingForAJobDescription}</p>}
              </p>
              <p>
                <label htmlFor={`aboutMe`}>aboutMe</label><br/>
                <input
                  type='input'
                  name={'aboutMe'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.aboutMe}
                />
                {touched.aboutMe && errors.aboutMe && <p>{errors.aboutMe}</p>}
              </p>
              <button
                disabled={!isValid && !dirty}
                onClick={onSubmit}
                type={'submit'}
              >Add data
              </button>
            </div>

          )
        }
      </Formik>
    </div>
  );
}