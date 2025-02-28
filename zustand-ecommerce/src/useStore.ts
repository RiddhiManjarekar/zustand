import { create } from 'zustand';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface CartItem {
  id: number;
  title: string;
  quantity: number;
}

interface Store {
  products: Product[];
  carts: CartItem[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
  setProducts: (products: Product[]) => void;
  setCarts: (carts: CartItem[]) => void;
}

const useStore = create<Store>((set) => ({
  products: [],
  carts: [],
  addProductToCart: (product) =>
    set((state) => {
      const existingProduct = state.carts.find((item) => item.id === product.id);
      if (existingProduct) {
        return {
          carts: state.carts.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return { carts: [...state.carts, { ...product, quantity: 1 }] };
      }
    }),
  removeProductFromCart: (productId) =>
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== productId),
    })),
  setProducts: (products) => set({ products }),
  setCarts: (carts) => set({ carts }),
}));

export default useStore;
