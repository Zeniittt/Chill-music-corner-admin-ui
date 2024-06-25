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

    getSongById: async (songId) => {
        try {
            const response = await axios.get(`${apiUrl}/songID?songID=${songId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching song:', error);
            throw error;
        }
    },

    addSong: async (token, songData) => {
        try {
            const response = await axios.post(apiUrl, songData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Thiết lập header 'Content-Type' là 'multipart/form-data'
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    updateSong: async (token, songId, updatedData) => {
        try {
            const response = await axios.patch(`${apiUrl}/${songId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating song:', error);
            throw error;
        }
    },

    deleteSong: async (token, songId) => {
        try {
            const response = await axios.delete(`${apiUrl}/${songId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default songServices;
