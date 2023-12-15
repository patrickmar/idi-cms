import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";
import { FaEdit, FaEllipsisH, FaTrash } from "react-icons/fa";
import { Button, Dropdown, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { remove, reset, fetch } from "../../features/post/postSlice";
import avatar from "../../assets/imgs/img1.jpg";
import Main from "../../components/Main";
import Breadcrumb from "../../components/Breadcrumb";
import FullLoader from "../../components/FullLoader";
import ButtonLoader from "../../components/ButtonLoader";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [openModal, setOpenModal] = useState();
  const [modalId, setModalId] = useState("");
  const props = { openModal, setOpenModal, modalId, setModalId };
  const dispatch = useDispatch();

  const getDate = (date) => {
    const newDate = moment(date).format("dddd, MMMM Do YYYY");
    return newDate;
  };

  const setModalPostId = (id) => {
    props.setOpenModal("pop-up");
    setModalId(id);
  };

  const deleteBlog = (e) => {
    e.preventDefault();
    dispatch(remove(modalId));
  };

  const { data, isLoading, isFullLoading, isError, isSuccess, message } =
    useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetch());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && data == null) {
      props.setOpenModal(undefined);
      toast.success(message);
      const filterPosts = posts.filter((p) => p._id !== modalId);
      setPosts(filterPosts);
    }

    if (isSuccess && data) {
      setPosts(data);
    }

    dispatch(reset());
  }, [data, isError, isSuccess, message, dispatch]);

  if (isFullLoading) {
    return <FullLoader />;
  }

  return (
    <Main>
      <div className="mb-4 col-span-full xl:mb-2">
        <Breadcrumb label={"Blogs"} label2={"All Blogs"} />
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          All Blogs
        </h1>
      </div>

      <div className="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
        <div className="flex items-center mb-4 sm:mb-0"></div>
        <Link
          to={"/add-blog"}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          Add new Blog
        </Link>
      </div>

      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 my-8">
        <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Our Company News
        </h2>

        {posts.length == 0 && (
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            No Posts found
          </p>
        )}
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {posts.length > 0 &&
          posts.map((post, i) => (
            <article
              key={i}
              className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <figure>
                <img
                  src={post?.image?.url}
                  alt={post.title}
                  className="custom-image rounded-lg"
                />
              </figure>
              <div className="flex justify-between items-center my-5 text-gray-500">
                <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                  <svg
                    className="mr-1 w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                      clipRule="evenodd"
                    ></path>
                    <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                  </svg>
                  {post.category}
                </span>
                <span className="text-sm">{getDate(post.updatedAt)}</span>
              </div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.title}
              </h2>
              <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                {post.excerpt}
              </p>
              {/* ReactHtmlParser (post.excerpt) */}
              {/* <div  dangerouslySetInnerHTML={{__html: data}} /> */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    className="w-7 h-7 rounded-full"
                    src={
                      post?.user?.image?.url ? post?.user?.image?.url : avatar
                    }
                    alt={post?.user?.firstName + " " + post?.user?.lastName}
                  />
                  <span className="font-medium dark:text-white">
                    {post.user.firstName + " " + post.user.lastName}
                  </span>
                </div>

                <Dropdown
                  placement="bottom"
                  label={<FaEllipsisH className="dark:text-white" />}
                  arrowIcon={false}
                  inline={true}
                >
                  <Dropdown.Item
                    icon={FaEdit}
                    as={Link}
                    to={"/edit-blog/" + post._id}
                  >
                    {" "}
                    <span>{"Edit"} </span>{" "}
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-red-600"
                    icon={FaTrash}
                    as={"button"}
                    onClick={() => setModalPostId(post._id)}
                  >
                    <span>{"   Delete"}</span>{" "}
                  </Dropdown.Item>
                </Dropdown>
              </div>
            </article>
          ))}
      </div>

      <Modal
        show={props.openModal === "pop-up"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this blog?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                type="button"
                disabled={isLoading}
                className={`${
                  isLoading ? "cursor-not-allowed bg-red-400 opacity-25" : ""
                } inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none 
                            focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 
                            dark:focus:ring-red-900`}
                onClick={(e) => deleteBlog(e)}
              >
                <ButtonLoader
                  isLoading={isLoading}
                  text="Proceed"
                  loadingText="Loading"
                />
              </button>
              <Button
                color="gray"
                onClick={() => props.setOpenModal(undefined)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Main>
  );
};

export default Blog;
