import React from "react";
import Main from "../components/Main";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PageNotFound = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Main>
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-3xl font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-white">
            Hi {user != null ? user.firstName : "there"}, It seems you miss your
            way. Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={user != null ? "/dashboard" : "/login"}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {user != null ? "Go to Dashboard" : "Go back home"}
            </Link>
            <a
              href="mailto:support@atendiconsulting.com"
              className="text-sm font-semibold text-gray-900 dark:text-white"
            >
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default PageNotFound;
