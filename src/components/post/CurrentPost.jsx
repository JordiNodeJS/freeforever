import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { contextClass } from '../../utilities/style'
import { activePost, startSavePost } from '../../actions'
import { useForm } from '../../hooks/useForm'

const CurrentPost = () => {
  const dispatch = useDispatch()
  const { activePost: entry } = useSelector(state => state.posts)

  const [formValues, handleInputChange, reset] = useForm(entry)
  const { title, body, author } = formValues

  const activeIdRef = useRef(entry?.id)

  useEffect(() => {
    if (entry?.id !== activeIdRef.current) {
      reset(entry)
      activeIdRef.current = entry?.id
    }
  }, [entry, reset])

  useEffect(() => {
    dispatch(activePost(formValues.id, { ...formValues }))
  }, [formValues])

  const handleSavePost = post => dispatch(startSavePost(post))

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

          <cite>Edited by {author}</cite>
          <div className='card-actions justify-end'>
            <button onClick={_ => handleSavePost(entry)} className='btn btn-info'>
              Save
            </button>
          </div>
        </div>
      </div>
      <div className='card w-96 bg-primary mt-2'>
        <div className='card-body'>
          <h1 className='card-title'>{title}</h1>
          <p className='text-secondary-content'>{body}</p>
          <cite>{author}</cite>
        </div>
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

export default CurrentPost
