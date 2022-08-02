import { useDispatch, useSelector } from 'react-redux'
import { startLogout, startNewPost } from '../actions'
import { AiOutlineLogout, AiOutlinePlusCircle } from 'react-icons/ai'

const SideBar = () => {
  const dispatch = useDispatch()
  const { name, photoURL } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
  }

  const handleAddEntry = () => {
    console.log('add entry')
    dispatch(startNewPost())
  }


  return (
    <div className='bg-base-200'>
      <div>
        <div className='btm-nav fixed top-0 flex justify-between items-center h-14'>
          <button>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
          </button>
          <button onClick={handleAddEntry} className='active text-xl'>
            <AiOutlinePlusCircle />
          </button>
          <div className='flex-row items-center flex-wrap'>
            {/* <div className='avatar w-8 rounded-full'>
              { photoURL && <img  src={ photoURL } alt='🎞' />}
              </div> */}
            
            <div className='ml-2 font-thin'>{name}</div>
          </div>

          <AiOutlineLogout
            onClick={handleLogout}
            type='button'
            className='flex-1 min-w-fit h-5 w-5 mr-2'>
            Log out
          </AiOutlineLogout>
        </div>
      </div>
    </div>
  )
}

export default SideBar
