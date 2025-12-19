import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { createProduct,deleteProduct,updateProduct,getAllProducts } from '../../../services/adminservices/product-services/services';


const initialState= {
 isLoading:true,
 totalProducts:[],
 isError:false
} 
// Create Product
export const useCreateProduct = createAsyncThunk(
  'products/create',
  async (formData, thunkAPI) => {
    try {
      return await createProduct(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Get All Products
export const useGetAllProducts = createAsyncThunk(
  'products/getAll',
  async (_, thunkAPI) => {
    try {
      return await getAllProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Update Product
export const useUpdateProduct = createAsyncThunk(
  'products/update',
  async ({ productId, formData }, thunkAPI) => {
    try {
      return await updateProduct(productId, formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// Delete Product
export const useDeleteProduct = createAsyncThunk(
  'products/delete',
  async (productId, thunkAPI) => {
    try {
      return await deleteProduct(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const adminProductSlice= createSlice({
    name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(useCreateProduct.pending, (state) => {
        state.isLoading = true;
       state.isError=false
      })
      .addCase(useCreateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError=false
        // assuming `result` contains the new product
      })
      .addCase(useCreateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError=true
      })

      // Get All Products
      .addCase(useGetAllProducts.pending, (state) => {
        state.isLoading = true;
        state.isError=false
      })
      .addCase(useGetAllProducts.fulfilled, (state, action) => {
       
        state.isLoading = false;
        state.totalProducts = action.payload.totalProducts;
         state.isError=false
      })
      .addCase(useGetAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.totalProducts=[]
         state.isError=false
      })

      // Update Product
      .addCase(useUpdateProduct.pending, (state) => {
        state.isLoading = true;
         state.isError=false
      })
      .addCase(useUpdateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
         state.isError=false
      })
      .addCase(useUpdateProduct.rejected, (state, action) => {
        state.isLoading = false;
         state.isError=true
      })

      // Delete Product
      .addCase(useDeleteProduct.pending, (state) => {
        state.isLoading = true;
         state.isError=false

      })
      .addCase(useDeleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
         state.isError=false
      })
      .addCase(useDeleteProduct.rejected, (state, action) => {
        state.isLoading = false;
         state.isError=true
      });
  },
});

export default adminProductSlice.reducer
