import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { getSearchProducts} from '../../../services/shopservices/search/services';

const initialState={
    searchProducts:[],
    isLoading:false,
}

// Get All Products
export const useGetSearchProducts = createAsyncThunk(
  'products/getfilter',
  async (keyword, thunkAPI) => {
    try {
      return await getSearchProducts(keyword);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const searchProductSlice=createSlice({
    initialState,
    name:"searchProducts",
    reducers:{
      resetSearchProducts:(state)=>{
        state.searchProducts=[]
      }
    },
    extraReducers:(builder)=>{
        builder 
        // Get All Products
              .addCase(useGetSearchProducts.pending, (state) => {
                state.isLoading = true;
                
              })
              .addCase(useGetSearchProducts.fulfilled, (state, action) => {
                
                state.isLoading = false;
                state.searchProducts = action?.payload?.data;
              })
              .addCase(useGetSearchProducts.rejected, (state) => {
                state.isLoading = false;
                state.searchProducts =[]
                state.isError=false
              })
        
    }
})
export const {resetSearchProducts}=searchProductSlice.actions
export default searchProductSlice.reducer