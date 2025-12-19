import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  apiOfAddAddress,
  apiOfFetchAddress,
  apiOfEditAddress,
  apiOfDeleteAddress,
} from '../../../services/address/services';

// Initial state
const initialState = {
  isLoading: false,
  isError: false,
  addressList: [],
};

// Fetch addresses
export const useFetchAddresses = createAsyncThunk(
  'address/fetch',
  async (userId, thunkAPI) => {
    try {
      return await apiOfFetchAddress(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add address
export const useAddAddress = createAsyncThunk(
  'address/add',
  async (formData, thunkAPI) => {
    try {
      return await apiOfAddAddress(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Edit address
export const useEditAddress = createAsyncThunk(
  'address/edit',
  async ({ userId, addressId, formData }, thunkAPI) => {
    try {
      return await apiOfEditAddress(userId, addressId, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete address
export const useDeleteAddress = createAsyncThunk(
  'address/delete',
  async ({ userId, addressId }, thunkAPI) => {
    try {
      return await apiOfDeleteAddress(userId, addressId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create slice
const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(useFetchAddresses.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(useFetchAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.addressList = action.payload?.data || [];
 
      })
      .addCase(useFetchAddresses.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.addressList = [];
      })

      // Add
      .addCase(useAddAddress.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(useAddAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(useAddAddress.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Edit
      .addCase(useEditAddress.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(useEditAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(useEditAddress.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Delete
      .addCase(useDeleteAddress.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(useDeleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(useDeleteAddress.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export default addressSlice.reducer;
