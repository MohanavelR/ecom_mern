import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/shop`,
});


export const getFilterProducts = async ({filterParams,sortParams}) => {

  try {
    const query=new URLSearchParams({
      ...filterParams,sortBy:sortParams
    })
    const response = await api.get(`/products?${query}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};
export const getProductDetail = async (productId) => {
  try {
    
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

