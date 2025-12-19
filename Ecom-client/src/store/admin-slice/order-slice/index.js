import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { apiOfgetAllOrder, apiOfGetOrderDetailOfAdmin, apiOfUpdateOrderStatus } from '../../../services/adminservices/order-services/service';



const initialState={
    totalOrders:[],
    orderDetails:null,
    isLoading:false
}
export const usegetAllOrder = createAsyncThunk(
  'order/getall',
  async ( _,thunkAPI) => {
    try {
      return await apiOfgetAllOrder();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const useGetOrderDetailsOfAdmin = createAsyncThunk(
  'order/details',
  async (orderId, thunkAPI) => {
    try {
      return await apiOfGetOrderDetailOfAdmin(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const useUpdateOrderStatus = createAsyncThunk(
  'order/updateOrder',
  async ({orderId,orderStatus}, thunkAPI) => {
    try {
      return await apiOfUpdateOrderStatus(orderId,orderStatus);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const adminOrderSlice=createSlice({
  name:'AdminOrders',
  initialState,
  reducers:{
 resetOrderDetails:(state)=>{
      state.orderDetails=null
    }
  },
  extraReducers:(builder)=>{
   builder.addCase(usegetAllOrder.pending, (state) => {
         state.isLoading = true
       }).addCase(usegetAllOrder.fulfilled, (state, action) => {
         state.isLoading = false
         state.totalOrders = action.payload?.data ?? []
         console.log(action.payload)
       }).addCase(usegetAllOrder.rejected, (state) => {
         state.isLoading = false
         state.totalOrders = []
       }).addCase(useGetOrderDetailsOfAdmin.pending, (state) => {
         state.isLoading = true
       }).addCase(useGetOrderDetailsOfAdmin.fulfilled, (state, action) => {
         state.isLoading = false
         state.orderDetails = action.payload?.data ?? null
       }).addCase(useGetOrderDetailsOfAdmin.rejected, (state) => {
         state.isLoading = false
         state.orderDetails = null
       }).addCase(useUpdateOrderStatus.pending, (state) => {
         state.isLoading = true
       }).addCase(useUpdateOrderStatus.fulfilled, (state, action) => {
         state.isLoading = false
       }).addCase(useUpdateOrderStatus.rejected, (state) => {
         state.isLoading = false
         
       })
  }
})

export const {resetOrderDetails}=adminOrderSlice.actions
export default adminOrderSlice.reducer