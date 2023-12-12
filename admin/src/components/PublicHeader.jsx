import React from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import logo from '..//assets/imgs/logo.png';

const PublicHeader = ({children}) => {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="mx-auto h-10 w-auto mr-2" src={logo} alt="logo" width={0} height={0} sizes="100vw" />
                </Link>
                {children}
            </div>            
        </section>
    )
}

PublicHeader.propTypes = {
    children: propTypes.node
}

export default PublicHeader