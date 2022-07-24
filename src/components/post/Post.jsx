import SideBar from '../SideBar'
import PostView from '../posts/PostView'
import { useSelector } from 'react-redux'

const Post = () => {
  const { activePost } = useSelector(state => state.posts)

  return (
    <div>
      <SideBar />
      <main>
        { activePost && <PostView />}
      </main>
    </div>
  )
}

export default Post
