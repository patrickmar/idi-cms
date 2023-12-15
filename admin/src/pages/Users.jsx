import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Main from "../components/Main";
import { toast } from "react-toastify";
import { fetchAll, reset } from "../features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";
import FullLoader from "../components/FullLoader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const { data, isFullLoading, isError, isSuccess, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && data != null) {
      setUsers(data);
    }

    dispatch(reset());
  }, [data, isError, isSuccess, message, dispatch]);

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  if (isFullLoading) {
    return <FullLoader />;
  }

  return (
    <Main>
      <div className="mb-4 col-span-full xl:mb-2">
        <Breadcrumb label={"Users"} label2={"All Users"} />
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          View All Users
        </h1>
      </div>

      <section className="bg-gray-50 dark:bg-gray-900 lg:py-3 lg:px-0 sm:p-5 antialiased">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                    required=""
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-4">
                    S/N
                  </th>
                  <th scope="col" className="px-4 py-4">
                    Full Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Department
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 &&
                  users.map((user, i) => (
                    <tr key={i} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3 dark:text-white">{i + 1}</td>
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.firstName
                          .slice()
                          .concat(" ")
                          .slice()
                          .concat(user.lastName)}
                      </th>
                      <td className="px-4 py-3 dark:text-white">
                        {user.email}
                      </td>
                      <td className="px-4 py-3 dark:text-white">
                        {user?.phoneNo}
                      </td>
                      <td className="px-4 py-3 dark:text-white max-w-[12rem] truncate">
                        {user?.department !== undefined
                          ? user?.department
                          : "Nil"}
                      </td>
                      <td className="px-4 py-3 dark:text-white">
                        {user?.role !== undefined ? user?.role : "Nil"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                {" "}
                1 - {users.length}{" "}
              </span>
              of
              <span className="font-semibold text-gray-900 dark:text-white">
                {" "}
                {users.length}
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="/users"
                  disabled
                  className="disabled flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="/users"
                  aria-current="page"
                  className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="/users"
                  disabled
                  className="disabled flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </Main>
  );
};

export default Users;
