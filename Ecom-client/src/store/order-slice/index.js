import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiOfCaptureOrder, apiOfCreateOrder, apiOfgetAllOrderByUsers, apiOfGetOrderDetail } from '../../services/order/service'

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null
}


export const useCreateOrder = createAsyncThunk(
  'order/add',
  async (data, thunkAPI) => {
    try {
      return await apiOfCreateOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const useCaptureOrder = createAsyncThunk(
  'order/payment',
  async (data, thunkAPI) => {
    try {
      return await apiOfCaptureOrder(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const usegetAllOrderByUsers = createAsyncThunk(
  'order/getall',
  async (userId, thunkAPI) => {
    try {
      return await apiOfgetAllOrderByUsers(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const useGetOrderDetails = createAsyncThunk(
  'order/details',
  async (orderId, thunkAPI) => {
    try {
      return await apiOfGetOrderDetail(orderId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    resetOrderDetails:(state)=>{
      state.orderDetails=null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(useCreateOrder.pending, (state) => {
      state.isLoading = true
    }).addCase(useCreateOrder.fulfilled, (state, action) => {
      state.isLoading = false
      state.approvalURL = action?.payload?.approvelUrl
      state.orderId = action?.payload?.orderId
      
      sessionStorage.setItem('currentOrderId', JSON.stringify(action?.payload?.orderId))
    }).addCase(useCreateOrder.rejected, (state) => {
      state.isLoading = false
      state.approvalURL = null
      state.orderId = null
    }).addCase(usegetAllOrderByUsers.pending, (state) => {
      state.isLoading = true
    }).addCase(usegetAllOrderByUsers.fulfilled, (state, action) => {
      state.isLoading = false
      state.orderList = action.payload?.data ?? []
       
    }).addCase(usegetAllOrderByUsers.rejected, (state) => {
      state.isLoading = false
      state.orderList = []
    }).addCase(useGetOrderDetails.pending, (state) => {
      state.isLoading = true
    }).addCase(useGetOrderDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.orderDetails = action.payload?.data ?? null
      
    }).addCase(useGetOrderDetails.rejected, (state) => {
      state.isLoading = false
      state.orderDetails = null
    })

  }
})
export const {resetOrderDetails}=orderSlice.actions
export default orderSlice.reducer