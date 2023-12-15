import React, { Fragment } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiNewspaper,
  HiUser,
  HiViewBoards,
  HiAnnotation,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Aside4 = ({ userData, open }) => {
  const menus = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: HiChartPie,
    },
    {
      name: "Blogs",
      icon: HiNewspaper,
      submenu: [
        {
          name: "View Blogs",
          link: "/blogs",
        },
        {
          name: "Create Blog",
          link: "/add-blog",
        },
        {
          name: "Create Vlog",
          link: "/add-blog?type=vlog",
        },
      ],
    },
    {
      name: "Profile",
      link: "/profile",
      icon: HiViewBoards,
    },
    {
      name: "Inbox",
      link: "/inbox",
      icon: HiInbox,
    },
    {
      name: "Users",
      link: "/users",
      icon: HiUser,
    },
  ];
  return (
    <>
      {userData !== null && (
        <Sidebar
          className={`fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width ${
            open ? "block" : "hidden"
          } `}
        >
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item className="lg:hidden">
                <form action="#" method="GET" className="lg:hidden">
                  <label htmlFor="mobile-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
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
                      id="mobile-search"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-200 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </Sidebar.Item>
              {menus.map((menu, i) => (
                <Fragment key={i}>
                  {menu.submenu != undefined && menu.submenu.length > 0 ? (
                    <Sidebar.Collapse icon={menu.icon} label={menu.name}>
                      {menu.submenu.map((sm, id) => (
                        <Sidebar.Item key={id} as={Link} to={sm.link}>
                          {sm.name}
                        </Sidebar.Item>
                      ))}
                    </Sidebar.Collapse>
                  ) : (
                    <Sidebar.Item icon={menu.icon} as={Link} to={menu.link}>
                      {" "}
                      {menu.name}{" "}
                    </Sidebar.Item>
                  )}
                </Fragment>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      )}
    </>
  );
};
Aside4.propTypes = {
  open: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
};

export default Aside4;
