import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import '../firebase.config'
import Welcome from '../components/post/Welcome'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import NotFound from '../components/NotFound'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { loginEmailAndPassword, loginGoogleAccount } from '../actions/auth'
import SideBar from '../components/SideBar'
import PrivateRoutes from './PrivateRouters'
import Home from '../components/post/Home'
import EditPost from '../components/post/EditPost'
import { startFetchPosts } from '../actions'
import PostEntries from '../components/post/PostEntries'

const PostApp = () => {
  const [checkAuth, setCheckAuth] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    const auth = getAuth()

    onAuthStateChanged(auth, async user => {

      if (user?.uid && user?.photoURL) {
        console.log('PostApp:loginGoogleAccount: user logged in')

        dispatch(startFetchPosts(user.uid))

        dispatch(loginGoogleAccount(user.uid, user.displayName, user.photoURL))
        setIsLogin(true)

      } else if (user?.uid && !user?.photoURL) {
        console.log('PostApp:loginEmailAndPassword:user logged in')

        dispatch(startFetchPosts(user.uid))

        dispatch(loginEmailAndPassword(user.uid, user.displayName, user.photoURL))
        setIsLogin(true)

      } else {
        console.log('user logged out')

        setIsLogin(false)
      }
      setCheckAuth(false)
    })
  }, [])

  if (checkAuth) return <h1 className='absolute bottom-0 right-1 text-info'>Waiting...</h1>

  return (
    <BrowserRouter>
      <SideBar isLogin={isLogin} />
      <div className='pt-14'></div>

      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/postentries' element={<PostEntries />} />
        <Route path='/auth' element={<Login />} />
        <Route path='/login' element={<Login isLogin={isLogin} />} />
        <Route path='/register' element={<Register />} />
        <Route element={<PrivateRoutes auth={isLogin} />}>
          <Route path='home' element={<Home />} />
          <Route path='editpost' element={<EditPost />} />
          <Route path='post/:id' element={<EditPost />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default PostApp
