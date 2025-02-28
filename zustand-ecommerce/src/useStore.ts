import { create } from "zustand";
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from "./productsApi";
import { getCarts, getCartById, addCart, updateCart, deleteCart } from "./cartsApi";
import { toast } from "sonner";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface Cart {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
}

interface StoreState {
  products: Product[];
  carts: Cart[];
  fetchProducts: () => Promise<void>;
  fetchProductById: (id: number) => Promise<Product>;
  createProduct: (product: Product) => Promise<void>;
  editProduct: (id: number, updatedProduct: Product) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;

  fetchCarts: () => Promise<void>;
  fetchCartById: (id: number) => Promise<Cart>;
  createCart: (cart: Cart) => Promise<void>;
  editCart: (id: number, updatedCart: Cart) => Promise<void>;
  removeCart: (id: number) => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  carts: [],

  fetchProducts: async () => {
    const data = await getProducts();
    set({ products: data });
  },

  fetchProductById: async (id) => {
    return await getProductById(id);
  },

  createProduct: async (product) => {
    await addProduct(product);
    toast.success("Product added successfully!");
  },

  editProduct: async (id, updatedProduct) => {
    await updateProduct(id, updatedProduct);
    toast.success("Product updated successfully!");
  },

  removeProduct: async (id) => {
    await deleteProduct(id);
    toast.success("Product deleted successfully!");
  },

  fetchCarts: async () => {
    const data = await getCarts();
    set({ carts: data });
  },

  fetchCartById: async (id) => {
    return await getCartById(id);
  },

  createCart: async (cart) => {
    await addCart(cart);
    toast.success("Cart added successfully!");
  },

  editCart: async (id, updatedCart) => {
    await updateCart(id, updatedCart);
    toast.success("Cart updated successfully!");
  },

  removeCart: async (id) => {
    await deleteCart(id);
    toast.success("Cart deleted successfully!");
  },
}));
