import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/user-Reducer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

type PropsType = { onFilterChanged: (filter: FilterType) => void }
type FriendType = 'true' | 'false' | 'null'
type FormType = { term: string; friend: FriendType }

export const UsersSearchForm: React.FC<PropsType> = ({onFilterChanged}) => {

  const filter = useSelector((state: AppStateType) => state.usersPage.filter)

  const usersSearchFormValidation = (values: FormType) => {
    const errors = {};
    return errors;
  }

  const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'null'
        ? null : values.friend === 'true'
          ? true : false
    }
    onFilterChanged(filter)
    setSubmitting(false);
  }

  return <>
    <Formik
      enableReinitialize
      initialValues={{term: filter.term, friend: String(filter.friend) as FriendType}}
      validate={usersSearchFormValidation}
      onSubmit={submit}
    >
      {({isSubmitting}) => (
        <Form>
          <Field type="text" name="term"/>
          <Field name="friend" as="select">
            <option value="null">All</option>
            <option value="true">Only followed</option>
            <option value="false">Only unfollowed</option>
          </Field>
          <button type="submit" disabled={isSubmitting}>
            Find
          </button>
        </Form>
      )}
    </Formik>
  </>
}