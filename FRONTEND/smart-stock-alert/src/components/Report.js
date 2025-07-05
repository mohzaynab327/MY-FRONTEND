import React, { useEffect, useState } from "react";

function Report() {
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        const lowStock = data.filter(
          (product) => product.quantity <= product.minimum_quantity
        );
        setLowStockProducts(lowStock);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Low Stock Report</h2>
      {lowStockProducts.length === 0 ? (
        <p>All products are sufficiently stocked.</p>
      ) : (
        <ul>
          {lowStockProducts.map((product) => (
            <li key={product.id}>
              {product.name} — Quantity: {product.quantity} (Min: {product.minimum_quantity})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Report;
