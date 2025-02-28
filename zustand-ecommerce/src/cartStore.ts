import { create } from "zustand";
import { getCarts } from "./cartsApi";

type CartStore = {
  carts: any[];
  fetchCarts: () => Promise<void>;
};

export const useCartStore = create<CartStore>((set) => ({
  carts: [],
  fetchCarts: async () => {
    const data = await getCarts();
    set({ carts: data });
  },
}));
