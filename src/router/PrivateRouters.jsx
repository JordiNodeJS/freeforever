import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


/**
 * If the user is logged in, then render the Outlet component, otherwise redirect to the login page.
 * @returns The PrivateRoutes component is being returned.
 */
const PrivateRoutes = _ => {
    const { isLogin } = useSelector(state => state.msg)
    return(
        isLogin ? <Outlet/> : <Navigate to="login"/>
    )
}

export default PrivateRoutes