import PostEntry from './PostEntry'
import { useSelector } from 'react-redux'

const PostEntries = () => {
  const { posts } = useSelector(state => state.posts)
  console.log(posts)

  return (
    <>
      <h1>PostEntries</h1>
      <div className='flex flex-col items-center'>
  
        {posts.map((post, index) => (
          <PostEntry key={post.id} {...post}>
            Post Entry {index + 1}
          </PostEntry>
        ))}
      </div>
    </>
  )
}

export default PostEntries
