import * as url from "./url_helper";
import api from "./api_helper";
import type { cartItems } from "./api_helper";

export const getProducts = async () => {
  const response = await api.get(url.GET_PRODUCTS);
  return response;
};

export const getCartPrices = async () => {
  const response = await api.get(url.GET_CART_PRICES);
  return response;
};

export const incrementCartItem = async (data: cartItems) => {
  const response = await api.post(url.POST_CART_STORE, {...data, action: "INCREMENT"});
  return response;
};
export const decrementCartItem = async (data: cartItems) => {
  const response = await api.post(url.POST_CART_STORE, {...data, action: "DECREMENT"});
  return response;
};
export const deleteCartItem = async (data: cartItems) => {
  const response = await api.post(url.POST_CART_STORE, {...data, action: "DELETE"});
  return response;
};

export const getCartIndex = async () => {
  const response = await api.get(url.GET_CART_INDEX);
  return response;
};

export const getCartClearCart = async () => {
  const response = await api.get(url.GET_CART_CLEAR_CART);
  return response;
};
