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

    getAlbumById: async (albumID) => {
        try {
            const response = await axios.get(`${apiUrl}/albumID?albumID=${albumID}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching song:', error);
            throw error;
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

    updateAlbum: async (albumID, updatedData) => {
        try {
            const response = await axios.patch(`${apiUrl}/${albumID}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating album:', error);
            throw error;
        }
    },

    deleteAlbum: async (albumID) => {
        try {
            const response = await axios.delete(`${apiUrl}/${albumID}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getListSongByAlbumID: async (albumID) => {
        console.log(albumID);
        try {
            const response = await axios.get(`${apiUrl}/listSong?albumID=${albumID}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default albumServices;
