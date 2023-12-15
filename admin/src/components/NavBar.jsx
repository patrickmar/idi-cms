import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/imgs/logo.png";
import { Avatar, Dropdown, Tooltip } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { get, removeItem, store } from "../utils/storage";
import { logout, reset } from "../features/auth/authSlice";
import avatar from "../assets/imgs/img1.jpg";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { FaMoon } from "react-icons/fa";
import { BiSun } from "react-icons/bi";
import FullLoader from "./FullLoader";

const NavBar = ({ userData, openSidebar, onSidebarOpen, onSidebarClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const storedTheme = get("theme");
  const [theme, setTheme] = useState(storedTheme ? storedTheme : "system");
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (
      get("theme") === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, []);

  const logoutUser = () => {
    dispatch(logout());
  };

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      store("theme", "dark");
    }
    if (theme === "light") {
      element.classList.remove("dark");
      store("theme", "light");
    } else if (theme === "system") {
      removeItem("theme");
    }
  }, [theme]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && user == null) {
      navigate("/", { state: { from: location?.pathname }, replace: true });
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, dispatch]);

  if (isLoading) {
    return <FullLoader />;
  }

  return (
    <>
      {userData != null && (
        <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button
                  onClick={() =>
                    !openSidebar ? onSidebarOpen() : onSidebarClose()
                  }
                  id="toggleSidebarMobile"
                  className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    id="toggleSidebarMobileHamburger"
                    className={`${!openSidebar ? "" : "hidden"} w-6 h-6`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    id="toggleSidebarMobileClose"
                    className={`${!openSidebar ? "hidden" : ""} w-6 h-6`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <Link to="/" className="flex ml-2 md:mr-24">
                  <img src={logo} className="h-8 mr-3" alt="Atendi Logo" />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                    IDI
                  </span>
                </Link>
                <form
                  action="/"
                  method="GET"
                  className="hidden lg:block lg:pl-3.5"
                >
                  <label htmlFor="topbar-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative mt-1 lg:w-96">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="email"
                      id="topbar-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() =>
                    !openSidebar ? onSidebarOpen() : onSidebarClose()
                  }
                  id="toggleSidebarMobileSearch"
                  type="button"
                  className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Search Posts</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>

                <Tooltip
                  content={`Switch to ${theme === "light" ? "dark" : "light"}`}
                  style={`${theme === "light" ? "dark" : "light"}`}
                >
                  <button
                    id="theme-toggle"
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                    type="button"
                    className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                  >
                    {theme === "light" ? (
                      <FaMoon size={20} />
                    ) : (
                      <BiSun size={20} />
                    )}
                  </button>
                </Tooltip>

                {/*  Profile */}
                <div className="flex items-center ml-3 dark:text-white">
                  <Dropdown
                    inline
                    label={
                      <Avatar
                        alt="User Profile"
                        img={
                          userData.image !== undefined &&
                          Object.keys(userData.image).length !== 0
                            ? userData.image.url
                            : avatar
                        }
                        rounded
                        onError={(e) => {
                          if (e.target.src !== avatar) {
                            e.target.onerror = null;
                            e.target.src = avatar;
                          }
                        }}
                      />
                    }
                  >
                    <Dropdown.Header>
                      <span className="block text-sm font-bold">
                        {" "}
                        {userData.firstName + " " + userData.lastName}
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {" "}
                        {userData.email}
                      </span>
                    </Dropdown.Header>
                    <Dropdown.Item as={Link} to={"/dashboard"}>
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={"/profile"}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={"/blogs"}>
                      Blogs
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as={"button"} onClick={logoutUser}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

NavBar.propTypes = {
  onSidebarOpen: PropTypes.func,
  onSidebarClose: PropTypes.func,
  openSidebar: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default NavBar;
