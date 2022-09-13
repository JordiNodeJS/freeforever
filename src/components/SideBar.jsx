import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BsFillFilePostFill } from 'react-icons/bs'
import MenuBar from './MenuBar'

const SideBar = () => {
  const { isLogin } = useSelector(state => state.msg)

  // const handleAddEntry = () => {
  //   console.log('add entry', isLogin)
  //   isLogin ? dispatch(startNewPost()) : alert('Please login first')
  // }

  return (
    <div className='bg-base-200'>
      <div>
        <MenuBar />
        <div className='btm-nav bottom-0 flex justify-between items-center h-14 z-50'>
          <Link to='/home'>
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
          </Link>
          <Link to='/postentries'>
            <button>
              <BsFillFilePostFill />
            </button>
          </Link>
          {isLogin && (
            <Link to='/addpost'>
              {' '}
              <button className='active text-xl'>
                <AiOutlinePlusCircle />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default SideBar
