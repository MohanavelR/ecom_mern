import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiOfAddFeatureImage, apiOfgetFeatureImage } from '../../services/feature/service'

const initialState = {
  images: [],
  isLoading: false,
}


const useAddFeatureImage = createAsyncThunk("feature/add", async (data, thunkAPI) => {
  try {
    return await apiOfAddFeatureImage(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})


const useGetFeatureImage = createAsyncThunk("feature/get", async (_, thunkAPI) => {
  try {
    return await apiOfgetFeatureImage()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const featureImageSlice = createSlice({
  name: 'reviewSlice',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(useAddFeatureImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(useAddFeatureImage.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(useAddFeatureImage.rejected, (state) => {
        state.isLoading = false
      })

      .addCase(useGetFeatureImage.pending, (state) => {
        state.isLoading = true
      })
      .addCase(useGetFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false
        state.images = action.payload?.data || []
      })
      .addCase(useGetFeatureImage.rejected, (state) => {
        state.isLoading = false
        state.images = []
      })
  }
})

export default featureImageSlice.reducer

export { useAddFeatureImage, useGetFeatureImage }
