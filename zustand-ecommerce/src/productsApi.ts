import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addProduct = async (product: any) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const updateProduct = async (id: number, updatedProduct: any) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedProduct);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
