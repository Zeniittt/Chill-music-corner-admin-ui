import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/login';

const loginServices = {
    loginWithAdmin: async (username, password) => {
        try {
            const respone = await axios.post(apiUrl, { username, password });
            return respone.data;
        } catch (error) {
            throw error.response ? error.response.data : new Error('Network error');
        }
    },
};

export default loginServices;
