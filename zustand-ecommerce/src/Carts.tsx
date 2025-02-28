import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCarts, addCart, deleteCart } from "./cartsApi";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";

const Carts = () => {
  const queryClient = useQueryClient();

  
  const { data: carts, isLoading, error } = useQuery({
    queryKey: ["carts"],
    queryFn: getCarts,
  });

  
  const addCartMutation = useMutation({
    mutationFn: addCart,
    onSuccess: () => {
      alert("Cart added successfully!");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });


  const deleteCartMutation = useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      alert("Cart deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });

  if (isLoading) return <p>Loading carts...</p>;
  if (error) return <p>Error loading carts</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-xl font-bold mb-4">Carts</h1>

       
        <Button onClick={() => addCartMutation.mutate({ userId: 1, products: [] })}>
          Add New Cart
        </Button>

        <ul className="mt-6">
          {carts.map((cart: any) => (
            <li key={cart.id} className="border p-4 flex justify-between items-center">
              <span>Cart ID: {cart.id}</span>
              <Button onClick={() => deleteCartMutation.mutate(cart.id)}>Delete Cart</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Carts;
