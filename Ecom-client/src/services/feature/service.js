import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/feature`, // Adjust your backend route base path accordingly
});

// Add to cart
export const apiOfAddFeatureImage = async (data) => {
  try {
    const response = await api.post('/add', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};


export const apiOfgetFeatureImage= async () => {
  try {
    const response = await api.get(`/get`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};


