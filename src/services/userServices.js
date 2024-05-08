import axios from 'axios';

const apiUrl = 'http://localhost:8383' + '/users';

const userServices = {
    getAllUser: async () => {
        try {
            const respone = await axios.get(apiUrl + '/');
            console.log(apiUrl);
            return respone.data;
        } catch (error) {
            console.error(error);
        }
    },

    addUser: async (userData) => {
        // Thêm userData vào hàm addUser
        try {
            const response = await axios.post(apiUrl + '/create', userData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default userServices;
