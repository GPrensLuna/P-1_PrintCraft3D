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

  const handleEdit = (productId) => {
    setEditingProduct(productId);
  };

  const handleSave = async () => {
    if (editingProduct === null) {
      return;
    }

    try {
      const editedProduct = products.find((p) => p.id === editingProduct);

      const response = await fetch(`${URL}ProductsLista/${editingProduct}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      if (!response.ok) {
        console.error("Error updating product. Response:", response);
      }

      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className={styles.tableContainer}>
      <h2>Product List</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.image}</td>
              <td>
                {editingProduct === product.id ? (
                  <input
                    type="text"
                    value={product.description}
                    onChange={(e) => {
                      setProducts((prevProducts) =>
                        prevProducts.map((p) =>
                          p.id === product.id
                            ? { ...p, description: e.target.value }
                            : p
                        )
                      );
                    }}
                  />
                ) : (
                  product.description
                )}
              </td>
              <td className={styles.actions}>
                {editingProduct === product.id ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(product.id)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
