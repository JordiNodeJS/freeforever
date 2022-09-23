import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import '../firebase.config'
import Welcome from '../components/post/Welcome'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import NotFound from '../components/NotFound'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import SideBar from '../components/SideBar'
import PrivateRoutes from './PrivateRouters'
import Home from '../components/post/Home'
import EditPost from '../components/post/EditPost'
import { loginEmailAndPassword, loginGoogleAccount } from '../actions'
import { startFetchPosts, isLogin } from '../actions'
import PostEntries from '../components/post/PostEntries'
import Footer from '../components/post/Footer'
import AddPost from '../components/post/AddPost'
import TestPost from '../components/post/TestPost'
import Public from '../components/post/Public'

const PostApp = () => {
  const [checkAuth, setCheckAuth] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, async user => {
      if (user?.uid && user?.photoURL) {
        console.log('PostApp:loginGoogleAccount: user logged in')

        dispatch(startFetchPosts(user.uid))

        dispatch(loginGoogleAccount(user.uid, user.displayName, user.photoURL))
        dispatch(isLogin(true))
      } else if (user?.uid && !user?.photoURL) {
        console.log('PostApp:loginEmailAndPassword:user logged in')

        dispatch(startFetchPosts(user.uid))

        dispatch(loginEmailAndPassword(user.uid, user.displayName, user.photoURL))
        dispatch(isLogin(true))
      } else {
        console.log('user logged out')
        dispatch(isLogin(false))
      }
      setCheckAuth(false)
    })
  }, [])

  if (checkAuth) return <h1 className='absolute bottom-0 right-1 text-info'>Waiting...</h1>

  return (
    <BrowserRouter>
      <SideBar />
      <div className='mt-14'></div>

      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='auth' element={<Login />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='public' element={<Public />} />
        <Route path='testpost' element={<TestPost />} />
        <Route element={<PrivateRoutes />}>
          <Route path='home' element={<Home />} />
          <Route path='postentries' element={<PostEntries />} />
          <Route path='editpost' element={<EditPost />} />
          <Route path='addpost' element={<AddPost />} />
          <Route path='post/:id' element={<EditPost />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default PostApp
