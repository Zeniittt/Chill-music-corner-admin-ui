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

    addArtist: async (artistData) => {
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

export default artistServices;
