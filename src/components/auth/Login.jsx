import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { startGoogleLogin } from '../../actions'
import { useForm } from '../../hooks/useForm'
import { startLoginEmailPassword } from '../../actions/auth'
import { ToastContainer } from 'react-toastify'

import { contextClass } from '../../utilities/style'


const Login = _ => {
  const { loading, isLogin } = useSelector(state => state.msg)
  

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: '',
  })

  
  const dispatch = useDispatch()

  const { email, password } = formValues

  const handleLogin = e => {
    e.preventDefault()
    dispatch(startLoginEmailPassword(email, password))
  }
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin()) // Calls the thunk action creator, and passes the thunk function to dispatch
  }

  if (isLogin ) return <Navigate to='/home' />

  return (
    <div data-theme='' className='hero min-h-screen bg-base-200 pt-14'>
      <div className='md:hero-content  flex-col lg:flex-row-reverse'>
        <div className='px-20 text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Login</h1>
          <p className='py-6'>Welcome to the login page.</p>
        </div>
        <form
          onSubmit={handleLogin}
          className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                value={email}
                onChange={handleInputChange}
                name='email'
                type='text'
                placeholder='email'
                className='input input-bordered'
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                value={password}
                onChange={handleInputChange}
                name='password'
                type='password'
                placeholder='password'
                className='input input-bordered'
              />
            </div>
            <div className='form-control mt-6'>
              <button type='submit' disabled={loading} className='btn btn-primary'>
                Login
              </button>
            </div>
            <div className='text-sm font-medium text-gray-700 dark:text-gray-400'>
              Not registered?{' '}
              <Link to='/register' className='text-purple-700 hover:underline dark:text-purple-500'>
                Create account
              </Link>
            </div>
          </div>
        </form>
        <div className='mt-10 flex justify-center'>
              <button
                onClick={handleGoogleLogin}
                className='btn btn-ghost  group h-12 px-6 border-2  rounded-full transition duration-300'>
                <div className='relative flex space-x-4 justify-start'>
                  <img
                    src='https://tailus.io/sources/blocks/social/preview/images/google.svg'
                    className='w-5'
                    alt='google logo'
                  />
                  <span className='block w-max font-semibold tracking-wide text-sm transition duration-300 sm:text-base'>
                    Continue with Google
                  </span>
                </div>
              </button>
            </div>
      </div>
      
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || 'default'] +
          ' relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        bodyClassName={() => 'text-sm font-white font-med block p-3'}
        position='top-center'
        autoClose={3000}
      />
    </div>
  )
}

export default Login
