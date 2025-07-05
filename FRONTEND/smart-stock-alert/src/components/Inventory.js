import React, { useEffect, useState } from "react";

function Inventory() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} — Quantity: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
