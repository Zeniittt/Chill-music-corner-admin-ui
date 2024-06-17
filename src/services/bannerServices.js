import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/banners';

const bannerServices = {
    getAllBanner: async () => {
        try {
            const token = localStorage.getItem('token');
            const respone = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const listBanner = respone.data;
            return listBanner;
        } catch (error) {
            console.error(error);
        }
    },

    getBannerById: async (bannerID) => {
        try {
            const response = await axios.get(`${apiUrl}/bannerID?bannerID=${bannerID}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching song:', error);
            throw error;
        }
    },

    addBanner: async (bannerData) => {
        try {
            const response = await axios.post(apiUrl, bannerData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Thiết lập header 'Content-Type' là 'multipart/form-data'
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    updateBanner: async (bannerID, updatedData) => {
        try {
            const response = await axios.patch(`${apiUrl}/${bannerID}`, updatedData);
            return response.data;
        } catch (error) {
            console.error('Error updating banner:', error);
            throw error;
        }
    },

    deleteBanner: async (bannerID) => {
        try {
            const response = await axios.delete(`${apiUrl}/${bannerID}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
};

export default bannerServices;
