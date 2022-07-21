import { types } from '../types'
import { startLoading, finishLoading, setError } from './ui'
import { toast } from 'react-toastify'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth'
import { app } from '../firebase.config'
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

export const startGoogleLogin = () => dispatch => {
  signInWithPopup(auth, googleAuthProvider)
    .then(result => {
      console.log(result.user)
      dispatch(loginGoogleAccount(result.user.uid, result.user.displayName, result.user.photoURL))
      dispatch(finishLoading())
    })
    .catch(error => {
      console.error(error)
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

export const startLoginEmailPassword = (email, password) => {
  return dispatch => {
    dispatch(startLoading())

    signInWithEmailAndPassword(auth, email, password).then(userCredntials => {
      const user = userCredntials.user
      dispatch(loginEmailAndPassword(user.uid, user.displayName))
      dispatch(finishLoading())
    })

    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(({ user }) => {
    //     dispatch(login(user.uid, user.displayName))

    //     dispatch(finishLoading())
    //   })
    //   .catch(err => {

    //     dispatch(finishLoading())
    //   })
  }
}

export const startRegisterEmailPasswordName = (email, password, name) => {
  return dispatch => {
    dispatch(startLoading())

    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredentials => {
        const user = userCredentials.user
        await updateProfile(user, { displayName: name })
        console.log(user.displayName)
        dispatch(loginEmailAndPassword(user.uid, user.displayName))
        dispatch(finishLoading())
      })
      .catch(err => {
        dispatch(setError(err.message))
        toast.error('🦄 ' + err.message)
      })

    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(async ({ user }) => {
    //     await updateProfile(user, {
    //       displayName: name,
    //     })
    //     dispatch(login(user.uid, user.displayName))
    //     console.log(user)
    //   })
    //   .catch(err => {
    //     // alert(err.message)
    //     toast.error('🦄 ' + err.message)
    //     console.log('🦄', err.message)
    //     dispatch(setError(err.message))
    //   })
  }
}

// export const startGoogleLogin = () => async dispatch => {
//   const { user } = await firebase.auth().signInWithPopup(googleAuthProvider)
//   dispatch(login(user.uid, user.displayName))
// }

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

export const logout = () => ({
  type: types.logout,
})

export const startLogout = () => {
  return dispatch => {
    // const auth = getAuth()
    signOut(auth)
      .then(() => {
        dispatch(logout())
      })
      .catch(err => {
        toast.error('🦄 ' + err.message)
      })
  }
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
