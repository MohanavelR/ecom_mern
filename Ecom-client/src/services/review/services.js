import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/review`,
});


export const apiOfAddProductsReview = async (data) => {

  try {
   
    const response = await api.post(`/add`,data,{
        headers:{
            "Content-Type":"application/json"
        }
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};
export const apiOfGetProductReview = async (productId) => {
  try {
    
    const response = await api.get(`/get/${productId}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

