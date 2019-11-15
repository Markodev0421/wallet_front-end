import {
  compose,
  defaultTo,
  head,
  keys,
  path,
  pickBy,
  propEq,
  split
} from 'ramda'
import {
  getFormAsyncErrors,
  getFormError,
  getFormInitialValues,
  getFormMeta,
  getFormNames,
  getFormSubmitErrors,
  getFormSyncErrors,
  getFormSyncWarnings,
  getFormValues,
  hasSubmitFailed,
  hasSubmitSucceeded,
  isDirty,
  isInvalid,
  isPristine,
  isSubmitting,
  isValid
} from 'redux-form'

const getActiveField = formName => state =>
  compose(
    defaultTo(null),
    head,
    keys,
    pickBy(propEq('active', true)),
    getFormMeta(formName)
  )(state)

const isAsyncValidating = formName => state => {
  const formPath = split('.', formName)
  return path(['form', ...formPath, 'asyncValidating'], state)
}

export {
  getActiveField,
  getFormValues,
  getFormInitialValues,
  getFormSyncErrors,
  getFormMeta,
  getFormAsyncErrors,
  getFormSyncWarnings,
  getFormSubmitErrors,
  getFormError,
  getFormNames,
  isDirty,
  isPristine,
  isValid,
  isInvalid,
  isSubmitting,
  isAsyncValidating,
  hasSubmitSucceeded,
  hasSubmitFailed
}
