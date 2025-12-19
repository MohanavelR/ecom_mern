import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/admin`, 
});

export const apiOfgetAllOrder=async()=>{
   try {
    const response = await api.get(`/allOrders`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}
export const apiOfGetOrderDetailOfAdmin=async(data)=>{
   try {
    const response = await api.get(`/details/${data}`);
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}
export const apiOfUpdateOrderStatus=async(data,orderStatus)=>{
   try {
    const response = await api.post(`/updateStatus/${data}`,{orderStatus});
    return response.data;
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
}
// details