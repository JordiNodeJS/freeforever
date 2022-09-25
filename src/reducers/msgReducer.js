import { types } from '../types'

const initialState = {
  loading: false,
  msgError: null,
}
// reducer for the form validator messenges state
/**
 * The function takes in a state and an action and returns a new state.
 * @param [state] - The current state of the store.
 * @param action - {type: "ui/uiSetError", payload: "Error"}
 * @returns The state of the application.
 */
export const msgReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
        return {
            ...state,
            msgError: action.payload,
        }
    case types.uiRemoveError:
        return {    
            ...state,
            msgError: null,
        }
    case types.startLoading:
      return {
        ...state,
        loading: true,
      }
    case types.finishLoading:
      return {
        ...state,
        loading: false,
      }
    
    case types.isLogin:
      return {
        ...state,
        isLogin: action.payload
      }

    default:
      return state
  }
}
