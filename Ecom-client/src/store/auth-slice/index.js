import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { useCheckAuth, useLogin, useLogout, useRegister } from '../../services/authservices/auth-servies'

const initialState={
    isAuthenticated:false,
    isLoading:true,
    user:null,
     isError:false
}
// Register main Method
export const register = createAsyncThunk('/auth/register', async (formData, thunkAPI) => {
  try {
    return await useRegister(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// Login main Method
export const login = createAsyncThunk('/auth/login', async (formData, thunkAPI) => {
  try {
    return await useLogin(formData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// Check Auth and Get Data main Method
export const checkAuth = createAsyncThunk('/auth/checkauth', async (_, thunkAPI) => {
  try {
    return await useCheckAuth();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
// Logout Main Method
export const logout =createAsyncThunk('/auth/logout',async(_,thunkAPI)=>{
  try{
  return await useLogout()
  }
  catch(e){
    return thunkAPI.rejectWithValue(e)
  }
})
// Create slice for Authentication
const authSlice=createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>{
        }
    },
    extraReducers:(builder)=>{
      // Register
        builder.addCase(register.pending,(state)=>{
            state.isLoading=true
             state.isError=false
        }).addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false
            state.user=null
             state.isError=false
            state.isAuthenticated=false
        }).addCase(register.rejected,(state,action)=>{
            state.isLoading=false
            state.user=null
            state.isAuthenticated=false
             state.isError=false
            // Login
        }).addCase(login.pending,(state)=>{
            state.isLoading=true
             state.isError=false
        }).addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false
             state.isError=false
            state.user=(action?.payload?.isSuccess)?action?.payload?.user:null
            state.isAuthenticated=action?.payload?.isSuccess
        }).addCase(login.rejected,(state,action)=>{
            state.isLoading=false
            state.user=null
            state.isAuthenticated=false
             state.isError=false
            // Check Auth
        }).addCase(checkAuth.pending,(state)=>{
            state.isLoading=true
             state.isError=false
        }).addCase(checkAuth.fulfilled,(state,action)=>{
            state.isLoading=false
             state.isError=false
            state.user=(action?.payload?.isSuccess)?action?.payload?.user:null
            state.isAuthenticated=action?.payload?.isSuccess
        }).addCase(checkAuth.rejected,(state,action)=>{
            state.isLoading=false
            state.user=null
             state.isError=true
            state.isAuthenticated=false
            // logout
        }).addCase(logout.pending,(state)=>{
            state.isLoading=true
             state.isError=false
        }).addCase(logout.fulfilled,(state,action)=>{
            state.isLoading=false
            state.user=!(action?.payload?.isSuccess)?action?.payload?.user:null
            state.isAuthenticated=!(action?.payload?.isSuccess)
             state.isError=false
        }).addCase(logout.rejected,(state,action)=>{
            state.isLoading=true
            state.user=null
            state.isAuthenticated=false
             state.isError=false
        })
    }
    

})

export const  {setUser} =authSlice.actions
export default authSlice.reducer