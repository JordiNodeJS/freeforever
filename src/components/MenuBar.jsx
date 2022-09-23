import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineLogout } from 'react-icons/ai'
import { startLogout } from '../actions/auth'
import { NavLink } from 'react-router-dom'

const MenuBar = () => {
  const dispatch = useDispatch()
  const { name, photoURL } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
  }

  return (
    <div className='btm-nav top-0 flex justify-between items-center h-14 z-50'>
      <div className='flex items-start opacity-60 text-red-700'>
        <NavLink to='public'>
          <svg className='w-8 ml-1 logo' xmlns='http://www.w3.org/2000/svg' viewBox='15 15 720 720'>
            <circle cx='375' cy='375' r='360' />
            <path
              fill='currentColor'
              d='M212 467l150 10-5 128-106-7c-82-34-47-127-39-131zm164-279l-84 125-108-68 59-88c70-54 133 23 133 32v-1zm161 282l-66-135 113-60 47 95c12 88-86 104-94 99v1zM353 130c51 2 140-10 154 13l51 60 42-19-80 105-127 1 53-28c-17-50-40-99-93-132zm245 349c-28 43-62 126-88 127l-77 14-5 46-51-122 63-110-2 60c52 10 106 15 161-15h-1zm-424 38c-24-46-78-117-66-140l26-74-37-27 131 17 64 109-51-32c-35 40-66 84-68 147'
            />
          </svg>
        </NavLink>
      </div>
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
  )
}

export default MenuBar
