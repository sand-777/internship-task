import React, { useEffect, useState } from "react";
import axios from "axios";

const TopProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/top-products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching top products:", error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div>
      <h2>Top 5 Best-Selling Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            {product.title}: {product.quantity_sold} sold
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;
