import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/albums';

const albumServices = {
    getAllAlbum: async () => {
        try {
            console.log(apiUrl);
            const respone = await axios.get(apiUrl);
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

    addAlbum: async (token, artistData) => {
        try {
            const response = await axios.post(apiUrl, artistData, {
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

    updateAlbum: async (token, albumID, updatedData) => {
        try {
            const response = await axios.patch(`${apiUrl}/${albumID}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating album:', error);
            throw error;
        }
    },

    deleteAlbum: async (token, albumID) => {
        try {
            const response = await axios.delete(`${apiUrl}/${albumID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
