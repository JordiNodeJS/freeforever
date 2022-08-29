import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { contextClass } from '../../utilities/style'
import { activePost, startDeletePost, startSavePost, startUploadFile } from '../../actions'
import { useForm } from '../../hooks/useForm'

const AddPost = () => {
  const dispatch = useDispatch()

  const [formValues, handleInputChange] = useForm({
    id: 321546,
    title: 'new',
    body: '',
    author: 'Tropomocho',
    date: 0,
  })

  const { id, title, body, author, date } = formValues

  useEffect(() => {
    dispatch(activePost(formValues.id, { ...formValues }))
  }, [formValues])

  const inputUploadRef = useRef()

  const handleButtonUploadClick = _ => {}
  const handleInputFileChange = _ => {}

  return (
    <>
      <div className='card w-full bg-primary'>
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
          <div className='form-control card-actions'>
            <button onClick={handleButtonUploadClick} className='btn btn-secondary'>
              Upload
            </button>
            <input
              ref={inputUploadRef}
              onChange={handleInputFileChange}
              type='file'
              className='hidden'
              placeholder='Upload'
            />
          </div>
          <div>
            {/* {entry?.image && <img src={entry.image} alt='Post' className='w-full' />} */}
          </div>
          <cite>Edited by {author}</cite>
          <div className='card-actions justify-end'>
            <button onClick={_ => handleDeletePost(entry)} className='btn btn-warning'>
              Delete
            </button>
            <button onClick={_ => handleSavePost(entry)} className='btn btn-info'>
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
