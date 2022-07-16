import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { authReducer } from '../reducers/authReducer'
import { uiReducer } from '../reducers/uiReducer'
import tunk from 'redux-thunk'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer
})

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(tunk)
  )
)
