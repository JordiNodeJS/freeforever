import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoutes = _ => {
    const { isLogin } = useSelector(state => state.msg)
    return(
        isLogin ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes