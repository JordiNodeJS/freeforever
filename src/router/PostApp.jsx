import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from '../components/post/Welcome'
import Login from '../components/auth/Login'
import NotFound from '../components/NotFound'

const PostApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Login />} />
        <Route path='/' element={<Welcome />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default PostApp
