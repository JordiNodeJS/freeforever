import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'
import '@animxyz/core'
import { XyzTransitionGroup, XyzTransition } from '@animxyz/react'
import './Register.css'
const Register = () => {
  const dispatch = useDispatch()

  const { msgError } = useSelector(state => state.ui)

  const [formValues, handleInputChange] = useForm({
    name: 'Paco',
    email: 'paco@gmail.com',
    password: '123456',
    password2: '123456',
  })

  const { name, email, password, password2 } = formValues
  const handleSubmit = e => {
    e.preventDefault()
    if (isFormValid()) {
      console.log(name, email, password)
    }
  }
  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('El nombre es obligatorio'))
      console.log('dispatch', 'Name is required')
      return false
    }
    if (!validator.isEmail(email)) {
      dispatch(setError('El email es inválido'))
      console.log('dispatch', 'Email is invalid')
      return false
    }
    if (password !== password2 || password.length < 5) {
      dispatch(setError('Las contraseñas no coinciden o son demasiado cortas'))
      console.log('dispatch', 'Passwords do not match')
      return false
    }
    dispatch(removeError())
    return true
  }

  return (
    <div className='hero min-h-screen bg-base-200'>
      <XyzTransition appear duration='auto'>
        <div
          xyz='fade small stagger ease-out-back'
          className='md:hero-content flex-col lg:flex-row-reverse'>
          <div
            xyz='fade flip-down stagger duration-10 delay-2 ease-out-back'
            className='text-center lg:text-left'>
            <h1 className='xyz-nested text-5xl font-bold'>Register to the app</h1>
            <p className='py-6'>dae et a id nisi.</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <div className='card-body'>
              <div className='form-control'>
                <label className='label'>
                  <span className='xyz-nested label-text'>Name</span>
                </label>
                <input
                  name='name'
                  value={name}
                  onChange={handleInputChange}
                  type='text'
                  placeholder='name'
                  className='xyz-nested input input-bordered'
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Email</span>
                </label>
                <input
                  name='email'
                  value={email}
                  onChange={handleInputChange}
                  type='text'
                  placeholder='email'
                  className='xyz-nested input input-bordered'
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  name='password'
                  value={password}
                  onChange={handleInputChange}
                  type='password'
                  placeholder='password'
                  className='xyz-nested input input-bordered'
                />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Password</span>
                </label>
                <input
                  name='password2'
                  value={password2}
                  onChange={handleInputChange}
                  type='text'
                  placeholder='password'
                  className='xyz-nested input input-bordered'
                />
              </div>
              <div xyz='small-100% origin-top delay-2 ease-out-back' className='form-control mt-6'>
                <button type='submit' className='xyz-nested btn btn-primary'>
                  Register
                </button>
              </div>
              <XyzTransitionGroup mode='out-in'>
                {msgError && (
                  <div xyz='fade left-100%' className='mt-2 font-thin text-sm text-warning'>
                    {msgError}
                  </div>
                )}
              </XyzTransitionGroup>
            </div>
          </form>
        </div>
      </XyzTransition>
    </div>
  )
}

export default Register
