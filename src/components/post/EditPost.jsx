import SideBar from '../SideBar'
import CurrentPost from './CurrentPost'
import { useSelector } from 'react-redux'

const EditPost = () => {
  const { activePost } = useSelector(state => state.posts)
  const { author } = activePost?? 'No post selected'
  return (
    <div>
      <SideBar />
      <main>
        { activePost && <CurrentPost />}
      </main>
    </div>
  )
}

export default EditPost
