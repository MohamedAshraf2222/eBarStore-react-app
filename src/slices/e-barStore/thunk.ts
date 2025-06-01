import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { 
    getProducts as fetchProducts,
    getCartIndex as getCartIndex,
    getCartPrices as fetchCartPrices,
    getCartClearCart as getCartClearCart,
    incrementCartItem as incrementProduct,
    decrementCartItem as decrementProduct,
    deleteCartItem as deleteProduct 
} from "../../helpers/backend_helpers";
import type { cartItems } from "../../helpers/api_helper";

export const getProducts = createAsyncThunk(
    "e-barStore/getProducts",
    async () => {
        try {
            const response = await fetchProducts();
            return response;
        } catch (error) {
            return error;
        }
    }
    );

export const getCartPrices = createAsyncThunk(
    "e-barStore/getCartPrices",
    async () => {
        try {
            const response = await fetchCartPrices();
            return response;
        } catch (error) {
            return error;
        }
    }
);

export const incrementCartItem = createAsyncThunk(
    "e-barStore/incrementCartItem",
    async (data: cartItems) => { 
        try {
            const response = await incrementProduct(data);
            toast.success("Product Added Successfully");
            return response;
        } catch (error) {
            toast.error(`${error}`||"Failed to add product", { autoClose: 3000 });
            return error;
        }
    }
);

export const decrementCartItem = createAsyncThunk(
    "e-barStore/decrementCartItem",
    async (data: cartItems) => {
        try {
            const response = await decrementProduct(data);
            toast.success("Product Removed Successfully");
            return response;
        } catch (error) {
            toast.error(`${error}`||"Failed to remove product", { autoClose: 3000 });
            return error;
        }
    }
);  

export const deleteCartItem = createAsyncThunk(
    "e-barStore/deleteCartItem",
    async (data: cartItems) => {
        try {
            const response = await deleteProduct(data);
            toast.success("Product Removed Successfully");
            return response;
        } catch (error) {
            toast.error(`${error}`||"Failed to remove product", { autoClose: 3000 });
            return error;
        }
    }
);

export const fetchCartIndex = createAsyncThunk(
    "e-barStore/fetchCartIndex",
    async () => {
        try {
            const response = await getCartIndex();
            // toast.success("Cart Index Updated Successfully");
            return response;
        } catch (error) {
            toast.error(`${error}`||"Failed to update cart index", { autoClose: 3000 });
            return error;
        }
    }
);

export const clearCart = createAsyncThunk(
    "e-barStore/clearCart",
    async () => {
        try {
            await getCartClearCart();
            toast.success("Cart Cleared Successfully");
            // return "Cart Cleared Successfully";
        } catch (error) {
            toast.error(`${error}`||"Failed to clear cart", { autoClose: 3000 });
            return error;
        }
    }
); 