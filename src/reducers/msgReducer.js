import { types } from '../types'

const initialState = {
  loading: false,
  msgError: null,
}
// reducer for the form validator messenges state
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

    default:
      return state
  }
}
