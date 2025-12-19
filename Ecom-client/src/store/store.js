import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import adminProductSlice from "./admin-slice/product-slice/index";
import shopProductSlice from "./shop/product-slice/index";
import addressSlice from "./shop/address-slice/index";
import shoppingCartSlice from "./cart-slice/index";
import orderSlice from "./order-slice/index";
import adminOrderSlice from "./admin-slice/order-slice/index";
import searchProductSlice from './shop/search-slice/index'
import reviewSlice from './review-slice/index'
import featureImageSlice from './feature-slice/index'

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductSlice,
        shopProducts: shopProductSlice,
        shoppingCart: shoppingCartSlice,
        address: addressSlice,
        order: orderSlice,
        adminOrder: adminOrderSlice,
        searchProducts: searchProductSlice,
        review: reviewSlice,
        featureImage:featureImageSlice

    }
})
export default store