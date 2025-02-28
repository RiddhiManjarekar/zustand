import { create } from "zustand";
import { getProducts } from "./productsApi";

type ProductStore = {
  products: any[];
  fetchProducts: () => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async () => {
    const data = await getProducts();
    set({ products: data });
  },
}));
