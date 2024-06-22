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
            const token = localStorage.getItem('token');
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

    updateGenre: async (genreID, updatedData) => {
        try {
            const token = localStorage.getItem('token');
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

    deleteGenre: async (genreID) => {
        try {
            const token = localStorage.getItem('token');
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
