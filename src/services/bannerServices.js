import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL + '/banners';

const bannerServices = {
    getAllBanner: async () => {
        try {
            const respone = await axios.get(apiUrl);
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

    addBanner: async (token, bannerData) => {
        try {
            const response = await axios.post(apiUrl, bannerData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Thiết lập header 'Content-Type' là 'multipart/form-data'
                },
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    updateBanner: async (token, bannerID, updatedData) => {
        try {
            const response = await axios.patch(`${apiUrl}/${bannerID}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating banner:', error);
            throw error;
        }
    },

    deleteBanner: async (token, bannerID) => {
        try {
            const response = await axios.delete(`${apiUrl}/${bannerID}`, {
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

export default bannerServices;
