import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'

const CurrentPost = () => {
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

  return (
    <>
      <div className='card w-full bg-primary'>
        <div className='card-body'>
          <div className='card-title'>
            <label className='label text-sm'>Title</label>
            <input
              onChange={handleInputChange}
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
              value={body}
              type='text'
              placeholder='Type here'
              className='textarea textarea-bordered h-24'
            />
          </div>

          <cite>Edited by {author}</cite>
        </div>
      </div>
      <div className='card w-96 bg-primary mt-2'>
        <div className='card-body'>
          <h1 className='card-title'>{title}</h1>
          <p className='text-secondary-content'>{body}</p>
          <cite>{author}</cite>
        </div>
      </div>
    </>
  )
}

export default CurrentPost
