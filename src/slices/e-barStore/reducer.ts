import { createSlice } from "@reduxjs/toolkit";
import { getProducts, incrementCartItem, decrementCartItem, deleteCartItem, fetchCartIndex, clearCart, getCartPrices } from "./thunk";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}


interface EBarStoreState {
  products: Product[];
  cartItems: CartItem[];
  // cartPrices: any;
  error: string | null;
  loading: boolean;
  submitLoading: boolean;
  deleteLoading: boolean;
}

export const initialState: EBarStoreState = {
  products: [],
  cartItems: [],
  // cartPrices: {},
  error: null,
  loading: false,
  submitLoading: false,
  deleteLoading: false,
};

const eBarStoreSlice = createSlice({
  name: "eBarStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Products
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(getProducts.fulfilled, (state, action: any) => {
      state.loading = false;
      state.products = action.payload.ECommerceBars;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch products";
    });

    // Add to Cart
    builder.addCase(incrementCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(incrementCartItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(incrementCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update cart";
    });

    // Decrement Cart
    builder.addCase(decrementCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(decrementCartItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(decrementCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update cart";
    });

    // Delete Cart
    builder.addCase(deleteCartItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCartItem.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to update cart";
    });

    // Fetch Cart
    builder.addCase(fetchCartIndex.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(fetchCartIndex.fulfilled, (state, action: any) => {
      state.loading = false;
      // console.log(action.payload.Cart.items);
      state.cartItems = action.payload.Cart;
      // state.cartPrices = action.payload.Cart.prices;
    });
    builder.addCase(fetchCartIndex.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch cart";
    });

    // Clear Cart
    builder.addCase(clearCart.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(clearCart.fulfilled, (state) => {
      state.loading = false;
      state.cartItems = [];
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to clear cart";
    });

    // Fetch Cart Prices
    builder.addCase(getCartPrices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(getCartPrices.fulfilled, (state, action: any) => {
      state.loading = false;
      state.cartItems = action.payload.data;
    });
    builder.addCase(getCartPrices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch cart prices";  
    });
  },
});

export default eBarStoreSlice.reducer;
