import { firebase, googleAuthProvider } from '../firebase.config'
import { types } from '../types'

export const startLoginEmailPassword = (email, password) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(login(email, password))
    }, 3500)
  }
}

export const startGoogleLogin = () => async dispatch => {
  const { user } = await firebase.auth().signInWithPopup(googleAuthProvider)
  dispatch(login(user.uid, user.displayName))
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
})
