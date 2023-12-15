import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Aside4 from "./Aside4";
import NavBar from "./NavBar";

const Main = ({ children }) => {
  const location = useLocation();
  const { user, isSuccess, isError } = useSelector((state) => state.auth);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [privateRoute, setPrivateRoute] = useState(false);
  const [auth, setAuth] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

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
  }, [user, auth, isSuccess, isError, location?.pathname]);

  return (
    <>
      {user != null && auth && privateRoute && (
        <div className="antialiased bg-gray-50 dark:bg-gray-900">
          <NavBar
            userData={user}
            openSidebar={openSidebar}
            onSidebarOpen={handleSidebarOpen}
            onSidebarClose={handleSidebarClose}
          />
          <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
            <Aside4 userData={user} open={openSidebar} />
            <div
              id="main-content"
              className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900"
            >
              {/* <main className="p-4 md:ml-64 h-auto pt-20 bg-gray-50 dark:bg-gray-900"> */}
              <main>
                <div className="py-8 pt-6 mx-4 max-w-screen-xl lg:py-6 bg-white md:min-h-screen dark:bg-gray-900 xl:p-8 rounded-lg">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
