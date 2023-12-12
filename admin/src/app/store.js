import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'
import profileReducer from '../features/profile/profileSlice'
import mailReducer  from "../features/mail/mailSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    post: postReducer,
    profile: profileReducer,
    mail: mailReducer,
    users: userReducer
  },
});
