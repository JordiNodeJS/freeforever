import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Welcome from '../components/post/Welcome'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import NotFound from '../components/NotFound'
import { useEffect, useState } from 'react'
import { firebase } from '../firebase.config'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'
import SideBar from '../components/auth/SideBar'

const PostApp = () => {
  const [checkAuth, setCheckAuth] = useState(true)
  const [isLogin, setIsLogin] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user?.uid) {
        console.log('user logged in')
        dispatch(login(user.uid, user.displayName))
        setIsLogin(true)
      } else {
        console.log('user logged out')
        setIsLogin(false)
      }
      setCheckAuth(false)
    })
  }, [dispatch, checkAuth, isLogin])

  if (checkAuth) return <h1 className='absolute bottom-0 right-1 text-info'>Waiting...</h1>

  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route path='/auth' element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/welcome' element={<Welcome />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default PostApp
