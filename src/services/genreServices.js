import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/genres';

const genreServices = {
    getAllGenre: async () => {
        try {
            console.log(apiUrl);
            const token = localStorage.getItem('token');
            const respone = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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

    addGenre: async (genreData) => {
        try {
            console.log(genreData);
            const response = await axios.post(apiUrl, genreData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    updateGenre: async (genreID, updatedData) => {
        try {
            const response = await axios.patch(`${apiUrl}/${genreID}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating genre:', error);
            throw error;
        }
    },

    deleteGenre: async (genreID) => {
        try {
            const response = await axios.delete(`${apiUrl}/${genreID}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default genreServices;
