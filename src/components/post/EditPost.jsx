import SideBar from '../SideBar'
import EditPostCurrent from './EditPostCurrent'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { contextClass } from '../../utilities/style'


const EditPost = () => {
  const { activePost } = useSelector(state => state.posts)
  const { author } = activePost ?? 'No post selected'
  return (
    <div>
      <SideBar />
      <main className='flex flex-col items-center'>{(activePost && author) ? <EditPostCurrent /> : <h1>No entry to edit</h1>}</main>
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
