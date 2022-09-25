/* 
    state = {} is the initial state of the reducer when your not authenticated
    state = { 
        uid: 'dafGejro54637657gljdf765', <== provided by firebase
        name: 'Joe
    
    } is the initial state of the reducer when you are authenticated
*/
import { types } from '../types'
const { loginGoogleAccount, loginEmailAndPassword, registerEmailAndPassword, logout } = types

/**
 * It takes in a state and an action and returns a new state based on the action.type.
 * @param [state] - the current state of the reducer
 * @param action - {
 * @returns The state is being returned.
 */
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
