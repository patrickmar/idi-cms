import axios from 'axios';
import { get, removeItem, store } from '../../utils/storage';
import AuthConstants from '../../config/authConstant';

const baseUrl = process.env.REACT_APP_BASEURL;

//register user
const register = async (data) => {
  const response = await axios.post(baseUrl + '/api/users', data);
  if (response.data) {
    store(AuthConstants(), response.data.data)
  }
  return response.data;
}

// Login user
const login = async (data) => {
  const response = await axios.post(baseUrl + '/api/users/login', data)
  if (response.data) {
    store(AuthConstants(), response.data.data);
  }
  return response.data
}

// Logout user
const logout = async () => {
  const user = get(AuthConstants())
  const response = await axios.get(baseUrl + '/api/users/logout', {
    headers: { 'Authorization': `Bearer ${user.token}` }
})
  if (response.data) {
    removeItem(AuthConstants())
  }
  return response.data;
}

const authService = {
  register, login, logout
}



export default authService