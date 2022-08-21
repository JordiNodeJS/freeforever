import SideBar from '../SideBar'
import EditPostCurrent from './EditPostCurrent'
import { useSelector } from 'react-redux'

const EditPost = () => {
  const { activePost } = useSelector(state => state.posts)
  const { author } = activePost ?? 'No post selected'
  return (
    <div>
      <SideBar />
      <main className='flex flex-col items-center'>{activePost && author && <EditPostCurrent />}</main>
    </div>
  )
}

export default EditPost
