import React, { useState, useEffect } from "react";
import { URL } from "../../config.js";
import styles from "./ProductList.module.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    // Función para obtener la lista de productos
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${URL}ProductsLista`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Se ejecuta solo al montar el componente

  const handleEdit = (product) => {
    // Función para activar la edición de un producto
    setEditingProduct({ ...product });
  };

  const handleUpdate = async () => {
    // Función para actualizar un producto
    try {
      const response = await fetch(`${URL}ProductsLista/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        // Actualizar la lista de productos después de la edición
        const updatedProducts = products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...editingProduct } : p
        );
        setProducts(updatedProducts);
        setEditingProduct(null); // Desactivar la edición
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
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.image}</td>
                <td>{product.description}</td>
                <td>{product.size}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.MaterialId}</td>
                <td>{product.CategoryId}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editingProduct && (
          <div className={styles.editForm}>
            {/* Formulario para editar el producto */}
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
            {/* Agrega más campos del producto según tus necesidades */}
            <button onClick={handleUpdate} className={styles.updateButton}>
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
