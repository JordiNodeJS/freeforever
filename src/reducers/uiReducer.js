import { types } from '../types'

const initialState = {
  loading: false,
  msgError: null,
}
// reducer for the form validator messenges state
export const uiReducer = (state = initialState, action) => {
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

    default:
      return state
  }
}
