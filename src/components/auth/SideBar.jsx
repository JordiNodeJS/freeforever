import { useDispatch } from "react-redux"
import { startLogout } from "../../actions/auth"

const SideBar = () => {

  const dispatch =  useDispatch()

  const handleLogout = () => {
    dispatch(startLogout())
    
  }

  
  return <div className='text-end p-2 bg-base-200'>
    <button onClick={handleLogout} type='button' className='btn btn-warning'>
      Log out{' '}
    </button>
  </div>}


export default SideBar
