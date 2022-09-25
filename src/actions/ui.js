import { types } from '../types'

export const setError = err => ({
  type: types.uiSetError,
  payload: err,
})
export const removeError = _ => ({
  type: types.uiRemoveError,
})

export const startLoading = _ => ({
  type: types.startLoading,
})
export const finishLoading = _ => ({
  type: types.finishLoading,
})

export const isLogin = value =>  ({
  type: types.isLogin,
  payload: value,
})