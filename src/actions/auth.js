import { firebase, googleAuthProvider, updateProfile } from '../firebase.config'
import { types } from '../types'

export const startLoginEmailPassword = (email, password) => {
  return dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({user}) => {
        dispatch(login(user.uid, user.displayName))
      })
  }
}

export const startLoginEmailPasswordName = (email, password, name) => {
  return dispatch => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await updateProfile(user, {
          displayName: name,
        })
        dispatch(login(user.uid, user.displayName))
        console.log(user)
      })
      .catch(error => {
        console.log(error)
      })
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
