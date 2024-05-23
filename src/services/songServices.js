import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/songs';

const songServices = {
    getAllSong: async () => {
        try {
            console.log(apiUrl);
            const token = localStorage.getItem('token');
            const respone = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const listSong = respone.data;
            return listSong;
        } catch (error) {
            console.error(error);
        }
    },

    addSong: async (songData) => {
        try {
            const response = await axios.post(apiUrl, songData, {
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

export default songServices;
