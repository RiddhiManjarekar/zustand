import { useState } from "react";
import { useStore } from "./useStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts } from "./productsApi";
import { toast } from "sonner";

const ProductsPage = () => {
  const queryClient = useQueryClient();
  const { createProduct, editProduct, removeProduct, fetchProductById } = useStore();
  const [productId, setProductId] = useState<number | null>(null);
  const [productData, setProductData] = useState({ title: "", price: "" });

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setProductData({ title: "", price: "" });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, updatedProduct }: { id: number; updatedProduct: any }) =>
      editProduct(id, updatedProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      setProductId(null);
      setProductData({ title: "", price: "" });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productData.title || !productData.price) {
      toast.error("Please enter all details!");
      return;
    }

    if (productId !== null) {
      updateProductMutation.mutate({ id: productId, updatedProduct: productData });
    } else {
      addProductMutation.mutate(productData);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <div className="mb-4 flex space-x-3">
        <button onClick={() => queryClient.invalidateQueries(["products"])} className="p-2 bg-blue-500 text-white rounded">
          Refresh Products
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mb-4 space-y-3">
        <input
          type="text"
          placeholder="Product Title"
          value={productData.title}
          onChange={(e) => setProductData({ ...productData, title: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: e.target.value })}
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          {productId !== null ? "Update Product" : "Add Product"}
        </button>
      </form>

      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <ul className="space-y-3">
          {products?.map((product: any) => (
            <li key={product.id} className="p-3 border rounded flex justify-between items-center">
              <span>{product.title} - ${product.price}</span>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setProductId(product.id);
                    setProductData({ title: product.title, price: product.price });
                  }}
                  className="p-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProductMutation.mutate(product.id)}
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

export default ProductsPage;
