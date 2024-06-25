import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/artists';

const artistServices = {
    getAllArtist: async () => {
        try {
            console.log(apiUrl);
            const token = localStorage.getItem('token');
            const respone = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const listArtist = respone.data;
            return listArtist;
        } catch (error) {
            console.error(error);
        }
    },

    getArtistById: async (artistID) => {
        try {
            const response = await axios.get(`${apiUrl}/artistID?artistID=${artistID}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching song:', error);
            throw error;
        }
    },

    addArtist: async (token, artistData) => {
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

    updateArtist: async (token, artistId, updatedData) => {
        try {
            const response = await axios.patch(`${apiUrl}/${artistId}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating artist:', error);
            throw error;
        }
    },

    deleteArtist: async (token, artistId) => {
        try {
            const response = await axios.delete(`${apiUrl}/${artistId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getListSongByArtistID: async (artistId) => {
        console.log(artistId);
        try {
            const response = await axios.get(`${apiUrl}/listSong?artistID=${artistId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    getListAlbumgByArtistID: async (artistId) => {
        console.log(artistId);
        try {
            const response = await axios.get(`${apiUrl}/listAlbum?artistID=${artistId}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default artistServices;
