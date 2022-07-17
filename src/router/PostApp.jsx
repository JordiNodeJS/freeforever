import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Welcome from '../components/post/Welcome'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import NotFound from '../components/NotFound'
import { useEffect } from 'react'
import { firebase } from '../firebase.config'
import { useDispatch } from 'react-redux'
import { login } from '../actions/auth'

const PostApp = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user?.uid) {
        console.log('user logged in')
        dispatch( login(user.uid, user.displayName))

      } else {
        console.log('user logged out')
      }
    })
  }, [])
  return (

        <BrowserRouter>
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
