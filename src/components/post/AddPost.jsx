import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { contextClass } from '../../utilities/style'
import { activePost, startNewPost } from '../../actions'
import { useForm } from '../../hooks/useForm'
import { useHandleUpload } from '../../hooks/useHandleUpload'

const AddPost = () => {
  const dispatch = useDispatch()
  const { activePost: entry } = useSelector(state => state.posts)
  const { isLogin } = useSelector(state => state.msg)

  const [formValues, handleInputChange] = useForm({
    title: 'new ' + Math.floor(Math.random() * 100 + 1),
    body: 'content here',
    author: 'Tropomocho',
    date: 0,
  })

  const { title, body, author } = formValues

  useEffect(() => {
    dispatch(activePost(formValues.id, { ...entry, ...formValues }))
  }, [formValues])

  // Upload button
  const [handleButtonUploadClick, handleInputFileChange, inputUploadRef] = useHandleUpload()

  // const handleSavePost = entry => dispatch(startSavePost(entry))
  const handleSavePost = entry =>
    isLogin ? dispatch(startNewPost(entry)) : alert('Please login first')

  return (
    <>
      <div className='card w-full bg-stone-700 animate-fade'>
        <div className='card-body'>
          <div className='card-title'>
            <label className='label text-sm'>Title</label>
            <input
              onChange={handleInputChange}
              name='title'
              value={title}
              type='text'
              placeholder='Type here'
              className='input w-full max-w-xs'
            />
          </div>
          <div className='form-control'>
            <label className='label text-sm'>Body</label>
            <textarea
              onChange={handleInputChange}
              name='body'
              value={body}
              type='text'
              placeholder='Type here'
              className='textarea textarea-bordered h-24'
            />
          </div>
          <div className='form-control'>
            <label className='label text-sm'>Author</label>
            <input
              onChange={handleInputChange}
              type='text'
              name='author'
              value={author}
              className='input w-full max-w-xs'
            />
          </div>
          <div className='form-control card-actions'>
            <button onClick={handleButtonUploadClick} className='btn btn-secondary'>
              Upload
            </button>
            <input
              onChange={handleInputFileChange}
              ref={inputUploadRef}
              type='file'
              className='hidden'
            />
          </div>
          <div className='container'>
            <h3 className='text-center font-thin text-2xl mb-6'>Preview</h3>
            <figure className='mb-2'>
              {entry?.image ? (
                <img src={entry.image} alt={title} className='w-full' />
              ) : (
                <img src={`https://via.placeholder.com/200`} alt='Shoes' />
              )}
            </figure>
          </div>
          <cite>Edited by {author}</cite>
          <div className='card-actions justify-end'>
            <button onClick={_ => handleDeletePost(entry)} className='btn btn-primary'>
              Delete
            </button>
            <button
              onClick={_ => handleSavePost(entry)}
              className='btn btn-outline btn-secondary active:bg-violet-700'>
              Save
            </button>
          </div>
        </div>
      </div>
      <div className='card w-6/12 bg-base-100 shadow-xl my-4 pb-2'>
        {/* <figure>
              {entry.image ? <img src={ entry.image} alt={title} className='w-full' />
              :
              <img src={`https://placeimg.com/400/225/arch`} alt='Shoes' />          
              }
            </figure> */}
        <div className='p-6'>
          <div className='flex justify-between items-center mb-2'>
            <h2 className='text-2xl font-light mb-3'>{title}</h2>
          </div>
          <p>{body}</p>
        </div>
        <p>{author}</p>
      </div>
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || 'default'] +
          ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        bodyClassName={() => 'text-sm font-white font-med block p-3'}
        position='bottom-center'
        autoClose={3000}
      />
    </>
  )
}

export default AddPost
