import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchAllProducts, addNewProduct, updateProduct, deleteProduct } from './productApi';
import useStore from './useStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const Products = () => {
  const { data: products, isLoading, error } = useQuery({ queryKey: ['products'], queryFn: fetchAllProducts });
  const { setProducts } = useStore((state) => state);

  React.useEffect(() => {
    if (products) {
      setProducts(products);
    }
  }, [products, setProducts]);

  const [productDetails, setProductDetails] = useState({
    title: '',
    price: 0,
    description: '',
    image: '',
  });

  const mutationAdd = useMutation({
    mutationFn: addNewProduct,
    onSuccess: (data) => {
      setProducts((prev) => [...prev, data]);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      setProducts((prev) =>
        prev.map((product) => (product.id === data.id ? { ...product, ...data } : product))
      );
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (id) => {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });

  const handleAddProduct = () => {
    if (!productDetails.title || productDetails.price <= 0) {
      alert('Please provide valid product details');
      return;
    }
    mutationAdd.mutate(productDetails);
  };

  const handleUpdateProduct = (id: number) => {
    mutationUpdate.mutate({ id, ...productDetails });
  };

  const handleDeleteProduct = (id: number) => {
    mutationDelete.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Button onClick={handleAddProduct}>Add Product</Button>
      <Input
        value={productDetails.title}
        onChange={(e) => setProductDetails({ ...productDetails, title: e.target.value })}
        placeholder="Title"
      />
      <Input
        type="number"
        value={productDetails.price}
        onChange={(e) => setProductDetails({ ...productDetails, price: +e.target.value })}
        placeholder="Price"
      />
      <Input
        value={productDetails.description}
        onChange={(e) => setProductDetails({ ...productDetails, description: e.target.value })}
        placeholder="Description"
      />
      <Input
        value={productDetails.image}
        onChange={(e) => setProductDetails({ ...productDetails, image: e.target.value })}
        placeholder="Image URL"
      />
      <div>
        {products?.map((product) => (
          <Card key={product.id}>
            <div>
              <img src={product.image} alt={product.title} />
              <p>{product.title}</p>
              <p>{product.description}</p>
              <Button onClick={() => handleUpdateProduct(product.id)}>Update</Button>
              <Button onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
