// src/ProductList.js

import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({ name: "", quantity: "" });

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/products/${id}/`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedProduct({ name: product.name, quantity: product.quantity });
  };

  const handleSave = (id) => {
    fetch(`http://localhost:8000/api/products/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    })
      .then((res) => res.json())
      .then((updated) => {
        setProducts(products.map((p) => (p.id === id ? updated : p)));
        setEditingProductId(null);
      });
  };

  const handleChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product List</h2>
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 mb-2 shadow rounded-md flex justify-between items-center">
          {editingProductId === product.id ? (
            <div className="flex gap-2">
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleChange}
                className="border px-2"
              />
              <input
                type="number"
                name="quantity"
                value={editedProduct.quantity}
                onChange={handleChange}
                className="border px-2"
              />
            </div>
          ) : (
            <div>
              <p><strong>{product.name}</strong> - Quantity: {product.quantity}</p>
            </div>
          )}

          <div className="space-x-2">
            {editingProductId === product.id ? (
              <button
                onClick={() => handleSave(product.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
