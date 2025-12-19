import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/cart`, // Adjust your backend route base path accordingly
});

// Add to cart
export const apiOfAddToCart = async (data) => {
  try {
    const response = await api.post('/create', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

// Get all cart items by userId
export const apiOfFetchCartItems = async (userId) => {
  try {
    const response = await api.get(`/get/${userId}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

// Update cart item quantity (expects { userId, productId, quantity } in body)
export const apiOfUpdateCartQuantity = async (data) => {
  try {
    const response = await api.put('/update', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

// Delete item from cart
export const apiOfDeleteFromCart = async (userId, productId) => {
  try {
    const response = await api.delete(`/delete/${userId}/${productId}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};
