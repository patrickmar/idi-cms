import axios from "axios";
import AuthConstants from "../../config/authConstant";
import { get } from "../../utils/storage"


const baseUrl = process.env.REACT_APP_BASEURL;

// get all users
const fetchAll = async () => {
    const user = get(AuthConstants())
    const response = await axios.get(baseUrl + '/api/users/all', {
        headers: { 'Authorization': `Bearer ${user.token}` }
    })
    return response.data;
}

const userService = {
    fetchAll
}

export default userService;