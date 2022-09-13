import PostEntry from './PostEntry'
import { useSelector } from 'react-redux'

const PostEntries = () => {
  const { posts } = useSelector(state => state.posts)
  console.log(posts)

  return (
    <>
      <div className='bg-white sm:p-6 dark:bg-gray-800 flex flex-col items-center animate-fade'>
  
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
