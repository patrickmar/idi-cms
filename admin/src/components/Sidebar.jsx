import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const { user, isSuccess, isError } = useSelector((state) => state.auth);
  const [privateRoute, setPrivateRoute] = useState(false);
  const [auth, setAuth] = useState(false);

  // const fullConfig = resolveConfig(tailwindConfig);
  // const breakpoints = fullConfig.theme.screens;
  // console.log(breakpoints);

  // const handleSidebarOpen = () => {
  //     setOpenSidebar(true);
  // };

  // const handleSidebarClose = () => {
  //     setOpenSidebar(false);
  // };

  //const isMd =  Mobile() //GetMediaQuery('md');

  //const open = isMd ? false : openSidebar;

  // const onLogout = () => {
  //     dispatch(logout())
  //     navigate('/')
  // }

  useEffect(() => {
    const path = location?.pathname;
    if (
      path === "/" ||
      path === "/register" ||
      path === "/forgot-password" ||
      path === "/terms" ||
      path === "/not-found"
    ) {
      setPrivateRoute(false);
    } else {
      setPrivateRoute(true);
    }

    if (user != null) {
      setAuth(true);
    }
  }, [user, auth, isSuccess, isError]);

  return (
    <>
      <></>
    </>
  );
};

export default Sidebar;
