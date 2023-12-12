import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import NavBar from './NavBar'
import Aside4 from './Aside4'
import { Mobile } from '../utils/mediaQuery'


const Sidebar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    const { user, isSuccess, isError } = useSelector((state) => state.auth)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [privateRoute, setPrivateRoute] = useState(false);
    const [auth, setAuth] = useState(false)

    // const fullConfig = resolveConfig(tailwindConfig);  
    // const breakpoints = fullConfig.theme.screens;
    // console.log(breakpoints);


    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    //const isMd =  Mobile() //GetMediaQuery('md');

    //const open = isMd ? false : openSidebar;

    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    useEffect(() => {
        const path = location?.pathname;
        if (path === '/' || path === '/register' || path === '/forgot-password' || path === '/terms' || path === '/not-found') {
            setPrivateRoute(false)
        } else {
            setPrivateRoute(true)
        }

        if (user != null) {
            setAuth(true)
        }
    }, [user, auth, isSuccess, isError])

    return (
        <>
            <>
            </>
        </>

    )
}

export default Sidebar