import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/admin/products`,
});

export const createProduct = async (formData) => {
  try {
    const response = await api.post('/add', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};
export const getAllProducts = async () => {
  try {
    const response = await api.get('/fetch');
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

// export const getProductById = async (productId) => {
//   try {
//     const response = await api.get(`product/${productId}`);
//     return response.data;
//   } catch (error) {
//     return error.response?.data || { isSuccess: false, message: error.message };
//   }
// };

export const updateProduct = async (productId, formData) => {
  try {
    const response = await api.put(`edit/${productId}`, formData);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`delete/${productId}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};