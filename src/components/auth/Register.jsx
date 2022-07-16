import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { removeError, setError } from '../../actions/ui'

const Register = () => {
  const dispatch = useDispatch()

  const { msgError } = useSelector(state => state.ui)
  console.log('from useSelector =>', msgError)

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
      <div className='md:hero-content flex-col lg:flex-row-reverse'>
        <div className='text-center lg:text-left'>
          <h1 className='text-5xl font-bold'>Register to the app</h1>
          <p className='py-6'>dae et a id nisi.</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Name</span>
              </label>
              <input
                name='name'
                value={name}
                onChange={handleInputChange}
                type='text'
                placeholder='name'
                className='input input-bordered'
              />
              <p className='mt-2 font-thin text-sm text-warning'>Alert</p>
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
                className='input input-bordered'
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
                className='input input-bordered'
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
                className='input input-bordered'
              />
            </div>
            <div className='form-control mt-6'>
              <button type='submit' className='btn btn-primary'>
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
