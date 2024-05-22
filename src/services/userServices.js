import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/users';

const userServices = {
    getAllUser: async () => {
        try {
            console.log(apiUrl);
            const token = localStorage.getItem('token');
            const respone = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const listUser = respone.data;
            Object.keys(listUser).forEach((key) => {
                var dataUser = listUser[key];
                if (dataUser.userID === 'THK88') {
                    delete listUser[key];
                }
            });
            return listUser;
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
