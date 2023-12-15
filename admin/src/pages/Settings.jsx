import React, { useEffect, useRef, useState } from "react";
import avatar from "../assets/imgs/img1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetch, reset, update } from "../features/profile/profileSlice";
import { HiOutlineCloudUpload } from "react-icons/hi";
import axios from "axios";
import ButtonLoader from "../components/ButtonLoader";
import Main from "../components/Main";
import Breadcrumb from "../components/Breadcrumb";
import FullLoader from "../components/FullLoader";

const Settings = () => {
  const values = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    role: "",
    department: "",
    country: "",
    city: "",
    address: "",
  };
  const [pass, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });
  const [account, setAccount] = useState(values);
  const [countries, setCountries] = useState([]);
  const [image, setImage] = useState("");
  const [imageBool, setImageBool] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const imageRef = useRef();
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    phoneNo,
    role,
    department,
    country,
    city,
    address,
  } = account;
  const { currentPassword, newPassword, newConfirmPassword } = pass;
  const {
    data,
    response,
    isLoading,
    isFullLoading,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.profile);

  const handleChange = (event) => {
    const img = event.target.files[0];
    const regex = /(\.jpg|\.jpeg|\.png)$/i;
    if (!regex.exec(img.name)) {
      setErrorMessage("Accepted file format is (.png, .jpg, .jpeg)");
    } else if (img.size > 500000) {
      setErrorMessage("Maximum of 500KB image size is allowed");
    } else {
      setErrorMessage("");
      setFileToBase(img);
    }
  };

  //convert image to base 64
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
      setImageBool(true);
    };
  };

  useEffect(() => {
    dispatch(fetch());
    getCountries();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && data) {
      setAccount(data);
      setImage(data?.image?.url);
      toast.success(message);
    }

    if (isSuccess && response) {
      setAccount(response);
      if (response?.image?.url) {
        setImage(response?.image?.url);
      }
    }

    if (isFullLoading) {
      console.log("full loading", isFullLoading);
    }

    dispatch(reset());
  }, [data, response, isError, isFullLoading, isSuccess, message, dispatch]);

  const onChange = (e) => {
    setAccount((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePassword = (e) => {
    setPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const savePassword = () => {
    console.log(account);
  };

  const submit = (e) => {
    e.preventDefault();
    const params = { ...account, image: imageBool ? image : "" };
    dispatch(update(params));
  };

  const ondeleteImage = () => {
    if (image !== "") {
      setImage("");
    }
  };

  const getCountries = async () => {
    try {
      const countryApi = process.env.REACT_APP_COUNTRY_API;
      const response = await axios.get(countryApi, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data) {
        setCountries(response.data);
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isFullLoading) {
    return <FullLoader />;
  }

  return (
    <Main>
      <div className="mb-4 col-span-full xl:mb-2">
        <Breadcrumb label={"User"} label2={"Settings"} />
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          User settings
        </h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
        <div className="col-span-full xl:col-auto">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
              <img
                className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
                src={image !== "" ? image : avatar}
                alt="profile"
              />
              <small
                className={`${
                  errorMessage === "" ? "hidden" : ""
                } mt-2 text-xs text-red-600 dark:text-red-600`}
              >
                {errorMessage}
              </small>
              <div>
                <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                  Profile picture
                </h3>

                <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  JPG or PNG. Max size of 500KB
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => imageRef.current.click()}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <input
                      id="upload"
                      name="file"
                      type="file"
                      ref={imageRef}
                      hidden
                      onChange={handleChange}
                    />
                    <HiOutlineCloudUpload
                      size={20}
                      className="w-4 h-4 mr-2 -ml-1"
                    />
                    Upload picture
                  </button>
                  <button
                    type="button"
                    onClick={ondeleteImage}
                    className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Permissions
            </h3>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={onChange}
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>Select Role</option>
                <option>Admin</option>
                <option>Super Admin</option>
                <option>Editor</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="department"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                value={department}
                onChange={onChange}
                className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option>Product Management</option>
                <option>Software Development</option>
                <option>Technical Consultant</option>
                <option>Business Management</option>
              </select>
            </div>
            {/* <div>
                                <button type='button'  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Save Role</button>
                            </div> */}
          </div>
        </div>
        <div className="col-span-2">
          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Personal information
            </h3>
            <form action="/">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={onChange}
                    name="firstName"
                    id="firstName"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                        focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="first name"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={onChange}
                    name="lastName"
                    id="lastName"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Green"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={onChange}
                    name="email"
                    id="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="example@company.com"
                    required
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="phoneNo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    value={phoneNo}
                    onChange={onChange}
                    name="phoneNo"
                    id="phoneNo"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g. +(12)3456 789"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    name="address"
                    id="address"
                    onChange={onChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g. California"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    name="city"
                    id="city"
                    onChange={onChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="e.g. San Francisco"
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={country}
                    onChange={onChange}
                    className="bg-gray-50 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option>Select Country</option>
                    {countries.length > 0 &&
                      countries.map((c, i) => (
                        <option key={i} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-span-6 sm:col-full">
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={submit}
                    className={`${
                      isLoading
                        ? "cursor-not-allowed bg-blue-400 opacity-25"
                        : ""
                    } text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg 
                                        text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                  >
                    <ButtonLoader
                      isLoading={isLoading}
                      text="Save Profile"
                      loadingText="Processing"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* password  */}

          <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold dark:text-white">
              Password information
            </h3>
            <form action="/">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="current-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Current password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={handlePassword}
                    name="currentPassword"
                    required
                    autoComplete={"off"}
                    id="current-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handlePassword}
                    name="newPassword"
                    autoComplete={"off"}
                    required
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    value={newConfirmPassword}
                    onChange={handlePassword}
                    name="newConfirmPassword"
                    autoComplete={"off"}
                    required
                    id="confirm-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div className="col-span-6 sm:col-full">
                  <button
                    disabled={isLoading}
                    type="submit"
                    onClick={savePassword}
                    className={`${
                      isLoading
                        ? "cursor-not-allowed bg-blue-400 opacity-25"
                        : ""
                    } text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                  >
                    <ButtonLoader
                      isLoading={isLoading}
                      text="Save Password"
                      loadingText="Loading"
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Settings;
