import axios from 'axios'


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials:true
});

export const useLogin= async(formData)=>{
    try {   
        const response = await api.post('auth/login',formData,{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        return error
    }
}
export const useRegister =async(formData)=>{
    try {
        const response = await api.post('auth/register',formData,
        {
            withCredentials:true
        }
    )
        return response.data
    } catch (error) {
        return error
    }
}
export const useCheckAuth= async () => {
    try {
        const response = await api.get(`auth/is-auth`,{
         withCredentials:true
    });
        return response.data;
    } catch (error) {
        return error
    }
}
export const useLogout =async()=>{
     try {
        const response = await api.get(`auth/logout`,{
         withCredentials:true
    });
        return response.data;
    } catch (error) {
        return error
    }
} 
// export const useCheckAuth = async () => {
//   try {
//     const response = await fetch('http://127.0.0.1:3000/api/auth/is-auth', {
//       method: 'GET',
//       credentials: 'include', // important for cookies!
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return { isSuccess: false, message: error.message };
//   }
// };