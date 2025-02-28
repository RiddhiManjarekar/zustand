import axios from "axios";

const API_URL = "https://fakestoreapi.com/carts";


export const getCarts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getCartById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addCart = async (cart: { userId: number; products: any[] }) => {
  const response = await axios.post(API_URL, cart);
  return response.data;
};


export const updateCart = async (id: number, updatedCart: any) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedCart);
  return response.data;
};

export const deleteCart = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
