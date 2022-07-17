import { firebase, googleAuthProvider, updateProfile } from '../firebase.config'
import { types } from '../types'
import { startLoading, finishLoading } from './ui'

export const startLoginEmailPassword = (email, password) => {
  return dispatch => {
    dispatch(startLoading())

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))

        dispatch(finishLoading())
      })
      .catch(err => {
        dispatch(finishLoading())
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

export const startLogout = () => {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(logout())
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const logout = () => ({
  type: types.logout,
})
