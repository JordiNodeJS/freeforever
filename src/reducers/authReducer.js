/* 
    state = {} is the initial state of the reducer when your not authenticated
    state = { 
        uid: 'dafGejro54637657gljdf765', <== provided by firebase
        name: 'Joe
    
    } is the initial state of the reducer when you are authenticated
*/
import { types } from '../types'
const { loginGoogleAccount, loginEmailAndPassword, registerEmailAndPassword, logout } = types

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case loginGoogleAccount:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        photoURL: action.payload.photoURL
      }
    case loginEmailAndPassword:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      }
    case registerEmailAndPassword:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
      }


    case logout:
      return {} 

    default:
      return state
  }
}
