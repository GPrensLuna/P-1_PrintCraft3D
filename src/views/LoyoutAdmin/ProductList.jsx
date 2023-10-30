import React, { useState, useEffect } from "react";
import { URL } from "../../config.js";
import styles from "./ProductList.module.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${URL}ProductsLista`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${URL}ProductsLista/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        const updatedProducts = products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...editingProduct } : p
        );
        setProducts(updatedProducts);
        setEditingProduct(null);
      } else {
        console.error("Error updating product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Size</th>
              <th>Price</th>
              <th>Stock</th>
              <th>MaterialId</th>
              <th>CategoryId</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{product.image}</td>
                <td>{product.description}</td>
                <td>{product.size.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.material.name}</td>
                <td>{product.category.name}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingProduct && (
          <div className={styles.editForm}>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              className={styles.editInput}
            />
            <label>
              Account Enabled:
              <input
                type="checkbox"
                checked={editingProduct.isAccountEnabled}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    isAccountEnabled: e.target.checked,
                  })
                }
              />
            </label>
            <button onClick={handleUpdate} className={styles.updateButton}>
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
