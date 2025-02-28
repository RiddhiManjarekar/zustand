import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchAllCarts, addNewCart, updateCart, deleteCart } from './cartApi';
import useStore from './useStore';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Cart = () => {
  const { data: carts, isLoading, error } = useQuery({ queryKey: ['carts'], queryFn: fetchAllCarts });
  const { setCarts } = useStore((state) => state);

  React.useEffect(() => {
    if (carts) {
      setCarts(carts);
    }
  }, [carts, setCarts]);

  const mutationAdd = useMutation({
    mutationFn: addNewCart,
    onSuccess: (data) => {
      setCarts((prev) => [...prev, data]);
    },
    onError: (error) => {
      console.error("Error adding cart:", error);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateCart,
    onSuccess: (data) => {
      setCarts((prev) =>
        prev.map((cart) => (cart.id === data.id ? { ...cart, ...data } : cart))
      );
    },
    onError: (error) => {
      console.error("Error updating cart:", error);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteCart,
    onSuccess: (id) => {
      setCarts((prev) => prev.filter((cart) => cart.id !== id));
    },
    onError: (error) => {
      console.error("Error deleting cart:", error);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Button onClick={() => mutationAdd.mutate({ products: [] })} disabled={mutationAdd.isLoading}>
        {mutationAdd.isLoading ? 'Adding...' : 'Add Cart'}
      </Button>

      <div>
        {carts?.map((cart) => (
          <Card key={cart.id}>
            <div>
              <p>Cart ID: {cart.id}</p>
              <Button onClick={() => mutationUpdate.mutate({ id: cart.id, products: cart.products })} disabled={mutationUpdate.isLoading}>
                {mutationUpdate.isLoading ? 'Updating...' : 'Update'}
              </Button>
              <Button onClick={() => mutationDelete.mutate(cart.id)} disabled={mutationDelete.isLoading}>
                {mutationDelete.isLoading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cart;
