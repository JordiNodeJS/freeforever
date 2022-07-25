import { legacy_createStore as createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { authReducer, msgReducer, postsReducer } from '../reducers'
import tunk from 'redux-thunk'

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose)

const reducers = combineReducers({
  auth: authReducer,
  msg: msgReducer,
  posts: postsReducer,
})

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(tunk)
  )
)
