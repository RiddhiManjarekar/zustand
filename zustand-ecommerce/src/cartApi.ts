import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/carts';

export const fetchAllCarts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchSingleCart = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addNewCart = async (cart: any) => {
  const response = await axios.post(API_URL, cart);
  return response.data;
};

export const updateCart = async (id: number, cart: any) => {
  const response = await axios.put(`${API_URL}/${id}`, cart);
  return response.data;
};

export const deleteCart = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
