import { useSelector } from 'react-redux'

const PostEntries = () => {
  const {posts} = useSelector(state => state.posts)
  console.log(posts)

  return <div>PostEntries</div>
}

export default PostEntries
