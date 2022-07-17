import { Provider } from 'react-redux'
import { store } from './store'
import PostApp from './router/PostApp'
const App = () => {
  return (
    <Provider store={store}>
      <PostApp />
    </Provider>
  )
}

export default App
