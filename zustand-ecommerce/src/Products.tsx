import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, addProduct, updateProduct, deleteProduct } from "./productsApi";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";

const Products = () => {
  const queryClient = useQueryClient();
  const [newProduct, setNewProduct] = useState({ title: "", price: 0 });

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      alert("Product added successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, updatedProduct }: { id: number; updatedProduct: any }) =>
      updateProduct(id, updatedProduct),
    onSuccess: () => {
      alert("Product updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      alert("Product deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h1 className="text-xl font-bold mb-4">Products</h1>

        
        <input
          type="text"
          placeholder="Product Title"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
          className="border p-2 mr-2"
        />
        <Button onClick={() => addProductMutation.mutate(newProduct)}>Add Product</Button>

       
        <ul className="mt-6">
          {products.map((product: any) => (
            <li key={product.id} className="border p-4 flex justify-between items-center">
              <span>{product.title} - ${product.price}</span>
              <div>
                <Button onClick={() => updateProductMutation.mutate({ id: product.id, updatedProduct: { title: "Updated Title" } })}>
                  Update
                </Button>
                <Button onClick={() => deleteProductMutation.mutate(product.id)} className="ml-2">
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;
