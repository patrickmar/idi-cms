import axios from 'axios';
import { get } from '../../utils/storage';
import AuthConstants from '../../config/authConstant';

//const user = get(AuthConstants()) //!= false ? get(AuthConstants()) : JSON.parse(unescape(atob(localStorage.getItem('user'))));

// if(user == false){
//     setTimeout(() => { get(AuthConstants())}, 3000);
//  //const user =  await new Promise(resolve => setTimeout(resolve(get(AuthConstants())), 3000));
// }

const baseUrl = process.env.REACT_APP_BASEURL;

const create = async (data) => {
  const user = get(AuthConstants());
  const response = await axios.post(baseUrl + '/api/posts/', data, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

const update = async (id, data) => {
  const user = get(AuthConstants());
  const response = await axios.put(baseUrl + '/api/posts/' + id, data, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

const fetch = async () => {
  const user = get(AuthConstants());
  console.log(user.token);
  const response = await axios.get(baseUrl + '/api/posts/', {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

const fetchOne = async (id) => {
  const user = get(AuthConstants());
  const response = await axios.get(baseUrl + '/api/posts/' + id, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

const remove = async (id) => {
  const user = get(AuthConstants());
  const response = await axios.delete(baseUrl + '/api/posts/' + id, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

const postService = {
  create,
  fetch,
  fetchOne,
  update,
  remove,
};

export default postService;
