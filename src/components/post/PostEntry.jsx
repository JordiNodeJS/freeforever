import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { activePost } from '../../actions'

const PostEntry = ({ id, title, body, author, date, children, image }) => {
  // dates are in milliseconds
  const fecha =
    new Date(date).getDay() + '/' + new Date(date).getMonth() + '/' + new Date(date).getFullYear()
  const hora =
    new Date(date).getHours() +
    ':' +
    new Date(date).getMinutes() +
    ':' +
    new Date(date).getSeconds()

  const delay = Math.floor(Math.random() * 1000) + 100
  const urlDelay = `https://deelay.me/${delay}/`

  // handles the click event of the button
  const dispatch = useDispatch()
  const handlePostEntry = () => {
    console.log('post entry', title)
    dispatch(activePost(id, { title, body, author, date, image }))
  }

  return (
    <>

      <div className='rounded-3xl overflow-hidden w-11/12 bg-base-100 shadow-xl my-4 pb-2'>
        <figure>
          {image ? <img  src={urlDelay + image} alt={title} />
          :
          <img src={`${urlDelay}https://placeimg.com/400/225/arch`} alt='Shoes' />          
          }
        </figure>
        <div className='p-6'>
          <div className='flex justify-between items-center mb-2'>
            <h2 className='text-2xl font-light mb-3'>{title}</h2>
            <Link to='/editpost'>
              <button
                onClick={handlePostEntry}
                className='btn btn-accent btn-circle ml-2 capitalize'>
                edit
              </button>
            </Link>
          </div>
          <p>{body}</p>
        </div>
        <p>{author}</p>
        <p>
          {fecha} 🕔 {hora}
        </p>
        <cite>{children}</cite>
      </div>
    </>
  )
}

export default PostEntry
