import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';

const Breadcrumb = (props) => {
    const { label, label2 } = props;

  return (
    <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                  <li className="inline-flex items-center">
                    <Link to="/" className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                      <HiHome size={20} className="w-5 h-5 mr-2.5"/> Home </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                      <Link to="/" className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white"> {label} </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                      <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500" aria-current="page"> {label2}</span>
                    </div>
                  </li>
                </ol>
              </nav>
  )
}
Breadcrumb.propTypes = {
    label: PropTypes.string.isRequired,
    label2: PropTypes.string.isRequired
}

export default Breadcrumb