import React, { useState } from "react";
import { Link } from "react-router-dom";
import PublicHeader from "../../components/PublicHeader";
import Terms from "../../components/modals/Terms";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [open, setOpen] = useState(false);

  const { email } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PublicHeader>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Forgot Password{" "}
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={onSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-orange-600 focus:border-orange-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                required={true}
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-orange-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-orange-600 dark:ring-offset-gray-800"
                  required={true}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <button
                    type="button"
                    onClick={onOpen}
                    className="font-medium text-orange-600 hover:underline dark:text-orange-500"
                  >
                    Terms and Conditions
                  </button>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              Submit
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Remember Password?{" "}
              <Link
                to="/"
                className="font-medium text-orange-600 hover:underline dark:text-orange-500"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </PublicHeader>

      <Terms open={open} onClose={onClose} />
    </>
  );
};

export default ForgotPassword;
