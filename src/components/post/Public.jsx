import { useDispatch, useSelector } from 'react-redux'
import PostEntry from './PostEntry'
import { startFetchPublic } from '../../actions'
import { useEffect } from 'react'

const Public = () => {

    const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startFetchPublic())
  }, [])

  const { publicPosts: posts } = useSelector(state => state.posts)
  console.log('public posts', posts)

  return (
    <>
      <div className='sm:p-6 dark:bg-gray-800 flex flex-col items-center animate-fade'>
        <h1>PUBLIC</h1>
        {posts.map((post, index) => (
          <PostEntry key={post.id} {...post}>
            Post Entry {index + 1}
          </PostEntry>
        ))}
      </div>
    </>
  )
}

export default Public
