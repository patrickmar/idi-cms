import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import Breadcrumb from "../components/Breadcrumb";
import { Greeting } from "../utils/functions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetch, reset } from "../features/post/postSlice";
import {
  fetch as fetchMail,
  reset as resetMail,
} from "../features/mail/mailSlice";
// import { fetchAll, reset as resetProfile } from '../features/profile/profileSlice'
import FullLoader from "../components/FullLoader";
import { fetchAll, reset as resetUsers } from "../features/users/userSlice";

const Dashboard = () => {
  const emptyCards = [
    { name: "", length: "" },
    { name: "", length: "" },
    { name: "", length: "" },
    { name: "Reviews", length: 0 },
  ];
  const [cards] = useState(emptyCards);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data, isFullLoading, isError, isSuccess, message } = useSelector(
    (state) => state.post
  );
  const mails = useSelector((state) => state.mail);
  const allUsers = useSelector((state) => state.users);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && data != null) {
      const values = [...cards];
      values[0].name = "Posts";
      values[0].length = data.length;
    }

    if (mails.isSuccess && mails.data != null) {
      const values = [...cards];
      values[1].name = "Mails";
      values[1].length = mails.data.length;
    }

    if (allUsers.isSuccess && allUsers.data != null) {
      const values = [...cards];
      values[2].name = "Users";
      values[2].length = allUsers.data.length;
    }

    dispatch(reset());
    dispatch(resetMail());
    dispatch(resetUsers());
  }, [user, data, mails, allUsers, isError, isSuccess, message, dispatch]);

  useEffect(() => {
    dispatch(fetch());
    dispatch(fetchMail());
    dispatch(fetchAll());
  }, []);

  if (isFullLoading) {
    return <FullLoader />;
  }

  return (
    <Main>
      <div className="mb-4 col-span-full xl:mb-2">
        <Breadcrumb label={"User"} label2={"Dashboard"} />
        {/* <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Dashboard</h1> */}
      </div>
      <div>
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
          <Greeting /> {" " + user.firstName}
        </h1>
      </div>

      <div className="grid gap-8 pt-5 lg:grid-cols-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="/dashboard">
              <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-indigo-900 dark:text-white">
                {card.name}
              </h5>
            </a>
            <p className="text-center mb-3 font-bold text-gray-700 dark:text-gray-400">
              {card.length}
            </p>
            {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
          </a> */}
          </div>
        ))}
      </div>
    </Main>
  );
};

export default Dashboard;
