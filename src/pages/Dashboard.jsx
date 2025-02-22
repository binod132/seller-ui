import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { fetchProducts, createProduct } from "../api";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleAddProduct = async (product) => {
    const newProduct = await createProduct(product);
    setProducts([...products, newProduct]);
  };

  return (
    <div>
      <Navbar />
      <h1>Seller Dashboard</h1>
      <ProductForm onSubmit={handleAddProduct} />
      <ProductList products={products} />
    </div>
  );
}

export default Dashboard;