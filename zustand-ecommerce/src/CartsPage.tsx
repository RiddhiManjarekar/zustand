import { useState } from "react";
import { useStore } from "./useStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCarts } from "./cartsApi";
import { toast } from "sonner";

const CartsPage = () => {
  const queryClient = useQueryClient();
  const { createCart, editCart, removeCart, fetchCartById } = useStore();
  const [cartId, setCartId] = useState<number | null>(null);
  const [cartData, setCartData] = useState({ userId: "", products: "" });

  
  const { data: carts, isLoading } = useQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });

  const addCartMutation = useMutation({
    mutationFn: createCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
      setCartData({ userId: "", products: "" });
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: ({ id, updatedCart }: { id: number; updatedCart: any }) =>
      editCart(id, updatedCart),
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
      setCartId(null);
      setCartData({ userId: "", products: "" });
    },
  });

  const deleteCartMutation = useMutation({
    mutationFn: removeCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cartData.userId || !cartData.products) {
      toast.error("Please enter all details!");
      return;
    }

    if (cartId !== null) {
      updateCartMutation.mutate({ id: cartId, updatedCart: cartData });
    } else {
      addCartMutation.mutate(cartData);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Carts</h1>

       <div className="mb-4 flex space-x-3">
        <button onClick={() => queryClient.invalidateQueries(["carts"])} className="p-2 bg-blue-500 text-white rounded">
          Refresh Carts
        </button>
      </div>

  
      <form onSubmit={handleSubmit} className="mb-4 space-y-3">
        <input
          type="number"
          placeholder="User ID"
          value={cartData.userId}
          onChange={(e) => setCartData({ ...cartData, userId: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Products (comma separated)"
          value={cartData.products}
          onChange={(e) => setCartData({ ...cartData, products: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          {cartId !== null ? "Update Cart" : "Add Cart"}
        </button>
      </form>

  
      {isLoading ? (
        <p>Loading carts...</p>
      ) : (
        <ul className="space-y-3">
          {carts?.map((cart: any) => (
            <li key={cart.id} className="p-3 border rounded flex justify-between items-center">
              <span>User {cart.userId}: {cart.products.join(", ")}</span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setCartId(cart.id);
                    setCartData({ userId: cart.userId, products: cart.products.join(", ") });
                  }}
                  className="p-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCartMutation.mutate(cart.id)}
                  className="p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartsPage;
