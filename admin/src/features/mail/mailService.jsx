import axios from 'axios';
import { get } from '../../utils/storage';
import AuthConstants from '../../config/authConstant';

const baseUrl = process.env.REACT_APP_BASEURL;

const fetch = async () => {
    const user = get(AuthConstants())
    const response = await axios.get(baseUrl + '/api/mail/', {
        headers: { 'Authorization': `Bearer ${user.token}` }
    });
    return response.data;
}

const mailService = {
    fetch
}

export default mailService