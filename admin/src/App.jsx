import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Post from './pages/Post';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Sidebar from './components/Sidebar';
import Settings from './pages/Settings';
import Blog from './pages/Blog/Blog';
import AddBlog from './pages/Blog/AddBlog';
import EditBlog from './pages/Blog/EditBlog';
import Terms from './pages/Terms';
import PageNotFound from './pages/PageNotFound';
import Inbox from './pages/Inbox';
import Users from './pages/Users';
import ProtectedRoute from './pages/ProtectedRoutes';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        {/* <Sidebar /> */}
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/not-found" element={<PageNotFound />} />
          <Route exact path="/terms" element={<Terms />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/profile" element={<Settings />} />
            <Route exact path="/blogs" element={<Blog />} />
            <Route exact path='/add-blog' element={<AddBlog />} />
            <Route exact path='/edit-blog/:id' element={<EditBlog />} />
            <Route exact path='/inbox' element={<Inbox />} />
            <Route exact path='/users' element={<Users />} />
          </Route>

          <Route path="*" element={<Navigate replace to="/not-found" />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
