import React, { useEffect, useState } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newQuantity, setNewQuantity] = useState("");

  // Fetch all products on component mount
  const fetchProducts = () => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add new product
  const handleAddProduct = () => {
    if (!newProductName || !newQuantity) {
      alert("Please enter product name and quantity.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/products/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProductName,
        quantity: parseInt(newQuantity),
        minimum_quantity: 5, // default minimum quantity
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json();
      })
      .then(() => {
        setNewProductName("");
        setNewQuantity("");
        fetchProducts();  // Refresh list after add
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding product");
      });
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchProducts();  // Refresh list after delete
        } else {
          throw new Error("Failed to delete product");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting product");
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Smart Stock Dashboard</h2>

      {/* Add product form */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Product name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newQuantity}
          onChange={(e) => setNewQuantity(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleAddProduct}>Add</button>
      </div>

      {/* Products list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {products.map((product) => (
          <li
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          >
            <span>
              {product.name} — Quantity: {product.quantity} (Min: {product.minimum_quantity})
            </span>

            <button
              onClick={() => handleDeleteProduct(product.id)}
              style={{
                background: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
