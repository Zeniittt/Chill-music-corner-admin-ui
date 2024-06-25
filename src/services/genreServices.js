import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/genres';

const genreServices = {
    getAllGenre: async () => {
        try {
            const respone = await axios.get(apiUrl);
            const listGenre = respone.data;
            return listGenre;
        } catch (error) {
            console.error(error);
        }
    },

    getGenreById: async (genreID) => {
        try {
            const response = await axios.get(`${apiUrl}/genreID?genreID=${genreID}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching song:', error);
            throw error;
        }
    },

    addGenre: async (token, genreData) => {
        try {
            const response = await axios.post(apiUrl, genreData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    updateGenre: async (token, genreID, updatedData) => {
        try {
            const response = await axios.patch(`${apiUrl}/${genreID}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating genre:', error);
            throw error;
        }
    },

    deleteGenre: async (token, genreID) => {
        try {
            const response = await axios.delete(`${apiUrl}/${genreID}`, {
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

export default genreServices;
