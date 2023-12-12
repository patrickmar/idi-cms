import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice';
import ButtonLoader from '../../components/ButtonLoader';
import PublicHeader from '../../components/PublicHeader';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess && user != null) {
            message !== '' && toast.success(message);
            navigate('/dashboard', { state: { from: location?.pathname }, replace: true });
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const userData = { email, password }
        dispatch(login(userData))
    }

    return (
        <PublicHeader>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login to Admin</h2>
                <form className="space-y-6" action="/" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input id="email" name={"email"} type="email" autoComplete="email" value={email} required onChange={onChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6text-gray-900 dark:text-white">
                                Password
                            </label>
                            <div className="text-sm">
                                <Link to='/forgot-password' className="font-semibold text-orange-600 hover:text-orange-500">Forgot password?</Link>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required value={password} onChange={onChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={isLoading} onClick={onSubmit} className={`${isLoading ? "cursor-not-allowed bg-orange-400 opacity-25" : ""} flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 `}>
                            <ButtonLoader isLoading={isLoading} text='Sign in' loadingText='Loading' />
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    No Account?{' '}
                    <Link to="/register" className="font-semibold leading-6 text-orange-600 hover:text-orange-500">
                        Register
                    </Link>
                </p>
            </div>
        </PublicHeader>
    )

}

export default Login