import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/order`, // Adjust your backend route base path accordingly
});

export const apiOfCreateOrder=async(data)=>{
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
}
export const apiOfCaptureOrder=async(data)=>{
   try {
    const response = await api.post('/payment', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}
export const apiOfgetAllOrderByUsers=async(data)=>{
   try {
    const response = await api.get(`/getall/${data}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}
export const apiOfGetOrderDetail=async(data)=>{
   try {
    const response = await api.get(`/getdetails/${data}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}




