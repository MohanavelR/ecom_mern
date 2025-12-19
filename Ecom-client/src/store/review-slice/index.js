import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiOfAddProductsReview, apiOfGetProductReview } from '../../services/review/services'

const initialState = {
  reviews: [],
  isLoading: false,
}


const useAddReview = createAsyncThunk("review/add", async (data, thunkAPI) => {
  try {
    return await apiOfAddProductsReview(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})


const useGetProductReview = createAsyncThunk("review/get", async (productId, thunkAPI) => {
  try {
    return await apiOfGetProductReview(productId)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const reviewSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {
    resetReviews:(state)=>{
      state.reviews=[]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(useAddReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(useAddReview.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(useAddReview.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(useGetProductReview.pending, (state) => {
        state.isLoading = true
      })
      .addCase(useGetProductReview.fulfilled, (state, action) => {
        state.isLoading = false
        state.reviews = action.payload?.data || []
      })
      .addCase(useGetProductReview.rejected, (state) => {
        state.isLoading = false
        state.reviews = []
      })
  }
})

export default reviewSlice.reducer
export const {resetReviews}=reviewSlice.actions
export { useAddReview, useGetProductReview }
