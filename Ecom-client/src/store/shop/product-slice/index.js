import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { getFilterProducts, getProductDetail } from '../../../services/shopservices/services';

const initialState={
    filterProducts:[],
    isLoading:false,
    isError:false,
    productDetail:null
}

// Get All Products
export const useGetFilterProducts = createAsyncThunk(
  'products/getfilter',
  async ({filterParams,sortParams}, thunkAPI) => {
    try {
      return await getFilterProducts({filterParams,sortParams});
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const useGetProductDetails = createAsyncThunk(
  'products/getproductDetails',
  async (productId, thunkAPI) => {
    try {
      return await getProductDetail(productId)
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const shopProductSlice=createSlice({
    initialState,
    name:"shopProducts",
    reducers:{},
    extraReducers:(builder)=>{
        builder 
        // Get All Products
              .addCase(useGetFilterProducts.pending, (state) => {
                state.isLoading = true;
                state.isError=false
              })
              .addCase(useGetFilterProducts.fulfilled, (state, action) => {
                state.isError=false
                state.isLoading = false;
                state.filterProducts = action.payload.filterProducts;
              })
              .addCase(useGetFilterProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.filterProducts=[]
                state.isError=false
              })
        // Get Products Details
              .addCase(useGetProductDetails.pending, (state) => {
                state.isLoading = true;
                state.isError=false
              })
              .addCase(useGetProductDetails.fulfilled, (state, action) => {
                state.isError=false
                state.isLoading = false;
                state.productDetail = action?.payload?.product;
              })
              .addCase(useGetProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                 state.productDetail = null
                state.isError=false
              })
    }
})

export default shopProductSlice.reducer