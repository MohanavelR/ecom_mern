import axios from 'axios';

const addressApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/address`
});

// Add address
export const apiOfAddAddress = async (data) => {
  try {

    const response = await addressApi.post('/create', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

// Fetch all addresses for a user
export const apiOfFetchAddress = async (userId) => {
  try {
    const response = await addressApi.get(`/get/${userId}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

// Edit an address
export const apiOfEditAddress = async (userId, addressId, data) => {
  try {
    const response = await addressApi.put(`/edit/${userId}/${addressId}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

// Delete an address
export const apiOfDeleteAddress = async (userId, addressId) => {
  try {
    const response = await addressApi.delete(`/delete/${userId}/${addressId}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};
