import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../assets/css/quill.css";
import { create, createVideo, reset } from "../../features/post/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PostTags, QuillFormats } from "../../data/data";
import ButtonLoader from "../../components/ButtonLoader";
import Main from "../../components/Main";
import Breadcrumb from "../../components/Breadcrumb";
import Dropzone from "../../utils/dropzone";

const AddBlog = () => {
  const dispatch = useDispatch();
  const values = {
    title: "",
    youtubeLink: "",
    excerpt: "",
    tags: [],
    category: "",
  };
  const [description, setDescription] = useState("");
  const [formData, setFormData] = useState(values);
  const [image, setImage] = useState();
  const [banners, setBanners] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [blogType, setBlogType] = useState("");
  const imageRef = useRef();
  const allTags = PostTags;
  const formats = QuillFormats;
  const { title, youtubeLink, excerpt, tags, category } = formData;
  const location = useLocation();

  const onChange = (e, i) => {
    const values = formData.tags;
    if (e.target.name === "tags") {
      if (e.target.checked == true) {
        values.push(e.target.value);
      } else if (e.target.checked == false) {
        //values.splice(i, 1);
        values.splice(values.indexOf(e.target.value), 1);
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const { data, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && data) {
      // data
      toast.success(message);
      setFormData(values);
      setImage();
      setDescription("");
      setBanners([]);
    }

    dispatch(reset());
  }, [data, isError, isSuccess, message, dispatch]);

  useEffect(() => {
    // Get the blog type from current URL
    const urlParams = new URLSearchParams(location.search);
    const type = urlParams.get("type");
    setBlogType(type);
  }, [location.search]);

  //handle and convert it in base 64
  const handleImage = (e) => {
    const img = e.target.files[0];
    const regex = /(\.jpg|\.jpeg|\.png)$/i;
    if (!regex.exec(img.name)) {
      e.preventDefault();
      setErrorMessage("Accepted file format is (.png, .jpg, .jpeg)");
    } else if (img.size > 500000) {
      e.preventDefault();
      setErrorMessage("Maximum of 500KB image size is allowed");
    } else {
      setErrorMessage("");
      setFileToBase(img);
    }
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      youtubeLink,
      excerpt,
      tags,
      category,
      description,
      image,
      banners,
    };
    console.log(data);
    blogType !== null ? dispatch(createVideo(data)) : dispatch(create(data));
  };

  return (
    <Main>
      <div className="mb-4 col-span-full xl:mb-2">
        <Breadcrumb
          label={"Blogs"}
          label2={`Create ${blogType !== null ? blogType : "Blog"}`}
        />
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          Create {blogType !== null ? blogType : "Blog"}
        </h1>
      </div>
      <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
        <div className="flex items-center mb-4 sm:mb-0">
          {/* <form className="sm:pr-3" action="/" method="GET">
                        <label htmlFor="blog-search" className="sr-only">Search</label>
                        <div className="relative w-48 mt-1 sm:w-64 xl:w-96">
                            <input type="search" name="blogSearch" id="blog-search" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Search for blogs" />
                        </div>
                    </form> */}
        </div>
        <Link
          to={blogType !== null ? "/blogs?type=vlog" : "/blogs"}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          View All {blogType !== null ? blogType + "s" : "Blogs"}
        </Link>
      </div>
      <form>
        <div className="grid grid-cols-1 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
          <div className="col-span-2">
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-semibold dark:text-white">
                Add a new {blogType !== null ? blogType : "blog"}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Post Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={onChange}
                    name="title"
                    id="title"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required=""
                  />
                </div>
                {blogType !== null ? (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="youtubeLink"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Youtube Link
                    </label>
                    <input
                      type="text"
                      value={youtubeLink}
                      onChange={onChange}
                      name="youtubeLink"
                      id="youtubeLink"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                ) : (
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="excerpt"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Excerpt
                    </label>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      value={excerpt}
                      onChange={onChange}
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-900  
                                                rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 
                                                dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type excerpt here"
                    ></textarea>
                  </div>
                )}

                {blogType == null && (
                  <div className="sm:col-span-2 mt-5">
                    <label
                      htmlFor="articleImages"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Article Images
                    </label>

                    <Dropzone
                      setBanners={setBanners}
                      className="p-16 my-2 relative block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary-600 bg-gray-100 dark:bg-meta-4"
                    />
                  </div>
                )}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <ReactQuill
                    className="add-new-post__editor mb-1"
                    formats={formats}
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={onSubmit}
                disabled={isLoading}
                className={`${
                  isLoading ? "cursor-not-allowed bg-blue-400 opacity-25" : ""
                }inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800`}
              >
                <ButtonLoader isLoading={isLoading} text="Publish" />
              </button>
            </div>
          </div>

          <div className="col-span-full xl:col-auto">
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-semibold dark:text-white">
                Categories
              </h3>
              <div className="mb-4">
                <label
                  htmlFor=""
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Category
                </label>
                <select
                  id="category"
                  onChange={onChange}
                  value={category}
                  name="category"
                  className=" border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option key={0} value={""}>
                    {"Select Category"}
                  </option>
                  {allTags.map((tag, i) => (
                    <option key={i + 1} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-semibold dark:text-white">
                Tags
              </h3>
              {allTags.map((tag, i) => (
                <div className="flex items-start mb-4" key={i}>
                  <div className="flex items-center h-5">
                    <input
                      id="tags"
                      type="checkbox"
                      onChange={(e) => {
                        onChange(e, i);
                      }}
                      name={"tags"}
                      value={tag}
                      className="w-4 h-4 border border-gray-300 rounded  focus:ring-3 focus:ring-primary-300 
                                                dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="tags"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      {tag}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-semibold dark:text-white">
                Featured Image
              </h3>
              <div className=" mb-4">
                <label
                  className="cursor-pointer block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="image"
                ></label>
                <button
                  type="button"
                  onClick={() => imageRef.current.click()}
                  className="dropzone-card justify-center block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <input
                    type="file"
                    ref={imageRef}
                    onChange={handleImage}
                    name="image"
                    accept="image/*"
                    hidden
                    className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 
                                            dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="image"
                    required
                  />

                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {image ? "Image uploaded" : "Click to upload Image"}
                  </p>
                  <small className="text-center">
                    {image ? "(Click to change)" : ""}
                  </small>
                </button>
                <p>
                  <small
                    className={`${
                      errorMessage === "" ? "hidden" : ""
                    } mt-2 text-xs text-red-600 dark:text-red-600`}
                  >
                    {errorMessage}
                  </small>
                </p>

                {image ? (
                  <>
                    <img
                      className="img-fluid my-4"
                      src={image}
                      alt="Post image"
                    />
                  </>
                ) : (
                  <small className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                    Dimension: 640 * 360
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </Main>
  );
};

export default AddBlog;
