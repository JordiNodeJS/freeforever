// import { firebase, googleAuthProvider, updateProfile } from '../firebase.config'
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
  signOut 
} from 'firebase/auth'

export const startLoginEmailPassword = (email, password) => {
  return dispatch => {
    dispatch(startLoading())

    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password).then(userCredntials => {
      const user = userCredntials.user
      dispatch(login(user.uid, user.displayName))
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
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredntials => {
        const user = userCredntials.user
        updateProfile(user, { displayName: name })
        dispatch(login(user.uid, user.displayName))
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

export const startGoogleLogin = () => dispatch => {
  const googleAuthProvider = new GoogleAuthProvider()
  const auth = getAuth()
  signInWithPopup(auth, googleAuthProvider)
    .then(({user}) => {
      console.log(user)
      dispatch(login(user.uid, user.displayName))
    })
    .catch(error => {
      // Handle Errors here.

      console.log('error ->', error)
      toast.error( `🦄 ${error.code} ${error.message}`  )

    })
}
// export const startGoogleLogin = () => async dispatch => {
//   const { user } = await firebase.auth().signInWithPopup(googleAuthProvider)
//   dispatch(login(user.uid, user.displayName))
// }

export const login = (uid, displayName) => ({
  type: types.login,
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
    const auth = getAuth()
    signOut(auth)
    .then(() => {
      dispatch(logout())
    }
    ).catch(err => {
      toast.error('🦄 ' + err.message)
    }
    )
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
