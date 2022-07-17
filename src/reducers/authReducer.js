/* 
    state = {} is the initial state of the reducer when your not authenticated
    state = { 
        uid: 'dafGejro54637657gljdf765', <== provided by firebase
        name: 'Joe
    
    } is the initial state of the reducer when you are authenticated
*/
import { types } from '../types'
const { login, logout } = types

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case login:
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
