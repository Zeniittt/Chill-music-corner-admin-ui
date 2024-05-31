import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/albums';

const albumServices = {
    getAllAlbum: async () => {
        try {
            console.log(apiUrl);
            const token = localStorage.getItem('token');
            const respone = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const listAlbum = respone.data;
            return listAlbum;
        } catch (error) {
            console.error(error);
        }
    },

    addAlbum: async (artistData) => {
        try {
            const response = await axios.post(apiUrl, artistData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Thiết lập header 'Content-Type' là 'multipart/form-data'
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default albumServices;
