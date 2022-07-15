import { firebase, googleAuthProvider } from '../firebase.config';
import { types } from '../types'

export const startLoginEmailPassword = (email, password) => {
  return dispatch => {
    setTimeout(() => {
        dispatch( login(123, 'juan') )
    }, 3500);
  }
}

export const startGoogleLogin = () => {
  return dispatch => {
    firebase.auth().signInWithPopup(googleAuthProvider)
    .then( userCredentials => {console.log(userCredentials)} )
  }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
})
