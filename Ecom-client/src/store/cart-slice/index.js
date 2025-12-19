import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiOfAddToCart, apiOfFetchCartItems, apiOfUpdateCartQuantity, apiOfDeleteFromCart } from '../../services/cartservices/services';
const initialState = {
  cartItems: [],
  isLoading: false,
  isError: false
}
// Add to Cart
export const useAddToCart = createAsyncThunk(
  'cart/add',
  async (data, thunkAPI) => {
    try {
      return await apiOfAddToCart(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Fetch Cart Items
export const useFetchCartItems = createAsyncThunk(
  'cart/fetch',
  async (userId, thunkAPI) => {
    try {
      return await apiOfFetchCartItems(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update Cart Quantity
export const useUpdateCartQuantity = createAsyncThunk(
  'cart/update',
  async (data, thunkAPI) => {
    try {
      return await apiOfUpdateCartQuantity(data); // data = { userId, productId, quantity }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete From Cart
export const useDeleteFromCart = createAsyncThunk(
  'cart/delete',
  async ({ userId, productId }, thunkAPI) => {
    try {
      return await apiOfDeleteFromCart(userId, productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const shoppingCartSlice = createSlice({
  name: "shoppindCartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to Cart
      .addCase(useAddToCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(useAddToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(useAddToCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Fetch Cart Items
      .addCase(useFetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(useFetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cartItems = action?.payload?.data
        
      })
      .addCase(useFetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.cartItems = []
      })

      // Update Cart Quantity
      .addCase(useUpdateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(useUpdateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(useUpdateCartQuantity.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;

      })

      // Delete From Cart
      .addCase(useDeleteFromCart.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(useDeleteFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.cartItems = action?.payload?.data
      })
      .addCase(useDeleteFromCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
})

export default shoppingCartSlice.reducer