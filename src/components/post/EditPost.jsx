import SideBar from '../SideBar'
import EditPostCurrent from './EditPostCurrent'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { contextClass } from '../../utilities/style'
import { Navigate } from 'react-router-dom'


const EditPost = () => {
  const { activePost } = useSelector(state => state.posts)
  const { author } = activePost ?? 'No post selected'
  return (
    <div>
      <SideBar />
      <main className='flex flex-col items-center animate-fade'>{(activePost && author) ? <EditPostCurrent /> : <Navigate to='/postentries' />}</main>
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || 'default'] +
          ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        bodyClassName={() => 'text-sm font-white font-med block p-3'}
        position='bottom-center'
        autoClose={3000}
      />
    </div>
  )
}

export default EditPost
