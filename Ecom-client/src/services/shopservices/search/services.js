import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/product`,
});


export const getSearchProducts = async (keyword) => {
  try {
    const response = await api.get(`/search/${keyword}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};