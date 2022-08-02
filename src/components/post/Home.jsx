import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { contextClass } from '../../utilities/style'

const Home = () => {
  const { isLogin } = useSelector(state => state.msg)
  toast.success('Welcome to the app')

  return (
    <>
      <h1>HOme</h1>
  

      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || 'default'] +
          ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        bodyClassName={() => 'text-sm font-white font-med block p-3'}
        position='bottom-center'
        autoClose={3000}
      />
    </>
  )
}

export default Home
