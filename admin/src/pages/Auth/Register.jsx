import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../../features/auth/authSlice';
import ButtonLoader from '../../components/ButtonLoader';
import PublicHeader from '../../components/PublicHeader';
import Terms from '../../components/modals/Terms';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    password: '',
    confirmPassword: '',
  })
  const [terms, setTerms] = useState(false)
  const [open, setOpen] = useState(false)

  const onOpen = () => {
    setOpen(true);
  }

  const onClose = () => {
    setOpen(false);
  };

  const { firstName, lastName, email, phoneNo, password, confirmPassword } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

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
    e.preventDefault();
    if (!terms) {
      toast.error('Please accept the terms and conditions')
    } else if (password !== confirmPassword) {
      toast.error('Password does not match');
    } else {
      const userData = { firstName, lastName, email, phoneNo, password, confirmPassword }
      dispatch(register(userData))
    }

  }

  return (
    <>
      <PublicHeader>
        <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white"> Create Account</h2>
          <form className="mt-8 space-y-6" action="/">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input type="text" name="firstName" id="firstName" onChange={onChange} value={firstName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 
                focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="First name" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input type="text" name="lastName" id="lastName" onChange={onChange} value={lastName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 
                focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Last name" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name="email" id="email" onChange={onChange} value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 
                focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="name@company.com" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="phoneNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input type="text" name="phoneNo" id="phoneNo" onChange={onChange} value={phoneNo}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 
                focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" placeholder="Last name" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input onChange={onChange} value={password} type="password" name="password" id="password" placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                <input onChange={onChange} value={confirmPassword} type="password" name="confirmPassword" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500" required />
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" onChange={(e) => setTerms(e.target.checked)} aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 text-orange-600 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:focus:ring-orange-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">I accept the {' '}
                  <button type='button' onClick={onOpen} className="text-orange-700 hover:underline dark:text-orange-500">Terms and Conditions</button></label>
              </div>
            </div>

            <button type="submit" disabled={isLoading} onClick={onSubmit} className={`${isLoading ? "cursor-not-allowed bg-orange-400 opacity-25" : ""} w-full px-5 py-3 text-base font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 sm:w-auto dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800`}>
              <ButtonLoader isLoading={isLoading} text='Create account' loadingText='Loading' />
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Already have an account? <Link to="/" className="text-orange-700 hover:underline dark:text-orange-500">Login here</Link>
            </div>

          </form>
        </div>
      </PublicHeader>

      <Terms open={open} onClose={onClose} />
    </>
  )

}

export default Register