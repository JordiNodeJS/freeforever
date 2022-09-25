import { types } from '../types'
import { startLoading, finishLoading, setError } from './ui'
import { toast } from 'react-toastify'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth, googleAuthProvider } from '../firebase.config'


/**
 * It dispatches an action to start the loading process, then it uses the firebase auth library to sign
 * in with google, then it dispatches an action to log in the user, and it dispatches an action to
 * finish the loading process.
 */
export const startGoogleLogin = () => dispatch => {
  signInWithPopup(auth, googleAuthProvider)
    .then(result => {
      console.log(result.user)
      dispatch(loginGoogleAccount(result.user.uid, result.user.displayName, result.user.photoURL))
      dispatch(finishLoading())
    })
    .catch(error => {
      console.warn(error)
      toast.error(error.message)
      dispatch(finishLoading())
    })
}
// export const startGoogleLogin = () => async dispatch => {
//   try {
//     dispatch(startLoading())
//     const result = await signInWithPopup(auth, googleAuthProvider)
//     const user = result.user
//     console.log(user)
//     dispatch(loginGoogleAccount(user.uid, user.displayName, user.photoURL))
//     dispatch(finishLoading())
//   } catch (error) {
//     console.log('error ->', error)
//     const credential = GoogleAuthProvider.credentialFromError(error)
//     toast.error(`🦄 ${error.code} ${error.message} ${credential}`)
//   }
// }

/**
 * It dispatches a startLoading action, then it calls the signInWithEmailAndPassword function, which
 * returns a promise. If the promise is resolved, it dispatches a loginEmailAndPassword action, then it
 * dispatches a finishLoading action. If the promise is rejected, it logs the error, dispatches a
 * setError action, displays a toast, and dispatches a finishLoading action.
 * @param email - string
 * @param password - string
 */
export const startLoginEmailPassword = (email, password) => dispatch => {
  dispatch(startLoading())

  signInWithEmailAndPassword(auth, email, password).then(userCredntials => {
    const user = userCredntials.user
    dispatch(loginEmailAndPassword(user.uid, user.displayName))
    dispatch(finishLoading())
  }).catch(error => {
    console.warn(error)
    dispatch(setError(error.code))
    toast.error(error.message)
    dispatch(finishLoading())
  }
  )
}

/**
 * It dispatches a startLoading action, -> it creates a user with email and password, -> it updates
 * the user's profile with the name, -> it dispatches a registerEmailAndPassword action, -> it
 * dispatches a finishLoading action.
 * @param email - string
 * @param password - "123456"
 * @param name - string
 */
export const startRegisterEmailPasswordName = (email, password, name) => dispatch => {
  dispatch(startLoading())

  createUserWithEmailAndPassword(auth, email, password)
    .then(async userCredentials => {
      const user = userCredentials.user
      await updateProfile(user, { displayName: name })
      console.log(user.displayName)
      dispatch(registerEmailAndPassword(user.uid, user.displayName))
      dispatch(finishLoading())
    })
    .catch(err => {
      dispatch(setError(err.message))
      toast.warning(err.message)
      dispatch(finishLoading())
    })
}



export const loginGoogleAccount = (uid, displayName, photoURL) => ({
  type: types.loginGoogleAccount,
  payload: {
    uid,
    displayName,
    photoURL,
  },
})

export const loginEmailAndPassword = (uid, displayName) => ({
  type: types.loginEmailAndPassword,
  payload: {
    uid,
    displayName,
  },
})
export const registerEmailAndPassword = (uid, displayName) => ({
  type: types.registerEmailAndPassword,
  payload: {
    uid,
    displayName,
  },
})

export const logout = () => ({
  type: types.logout,
})

export const logoutCleanPosts = _ => ({
  type: types.postsLogoutCleanUp,
})

/**
 * It dispatches two actions, one to logout and one to clean the posts.
 */
export const startLogout = () => dispatch => {
  signOut(auth)
    .then(() => {
      dispatch(logout())
      dispatch(logoutCleanPosts())
    })
    .catch(err => {
      toast.error('🦄 ' + err.message)
    })
}






// export const startLogout = () => {
//   return dispatch => {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         dispatch(logout())
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
// }
