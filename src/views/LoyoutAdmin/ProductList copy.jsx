import React, { useState, useEffect } from "react";
import { URL } from "../../config.js";
import styles from "./ProductList.module.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editedFields, setEditedFields] = useState({});
  const [editStatus, setEditStatus] = useState({});

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

  const handleEdit = (productId, product) => {
    setEditStatus((prevEditStatus) => ({
      ...prevEditStatus,
      [productId]: { editing: true },
    }));
    // Set initial values for edited fields based on the product
    setEditedFields({
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      stock: product.stock,
      material: product.material.name,
      category: product.category.name,
      deleted: product.deleted,
    });
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [fieldName]: fieldName === "price" ? parseFloat(value) : value,
    }));
  };

  const handleInlineUpdate = async (productId) => {
    try {
      const productToEdit = products.find((p) => p.id === productId);

      if (!productToEdit) {
        console.error("Product not found for editing.");
        return;
      }

      const editedProduct = {
        ...productToEdit,
        ...editedFields,
      };

      const response = await fetch(`${URL}ProductsLista/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === productId ? editedProduct : p))
        );
        setEditStatus((prevEditStatus) => ({
          ...prevEditStatus,
          [productId]: { editing: false },
        }));
        setEditedFields({});
      } else {
        console.error("Error updating product. Response:", response);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const renderInputField = (fieldName, value, placeholder) => (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>{fieldName}:</label>
      <input
        className={styles.editInput}
        type="text"
        value={value !== undefined ? value : placeholder}
        onChange={(e) => handleFieldChange(fieldName, e.target.value)}
      />
    </div>
  );

  const renderTableCell = (product, fieldName) => {
    const isEditing = editStatus[product.id]?.editing;
    const value = isEditing ? editedFields[fieldName] : product[fieldName];

    return (
      <td key={fieldName}>
        {isEditing
          ? renderInputField(fieldName, value, product[fieldName])
          : fieldName === "material" || fieldName === "category"
          ? value.name // Render only the 'name' property
          : value}
      </td>
    );
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
            <th>Price</th>
            <th>Stock</th>
            <th>Material</th>
            <th>Category</th>
            <th>Deleted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              {renderTableCell(product, "name")}
              {renderTableCell(product, "image")}
              {renderTableCell(product, "description")}
              {renderTableCell(product, "price")}
              {renderTableCell(product, "stock")}
              {renderTableCell(product, "material")}
              {renderTableCell(product, "category")}
              {renderTableCell(product, "deleted")}
              <td className={styles.actions}>
                {editStatus[product.id]?.editing ? (
                  <>
                    <button onClick={() => handleInlineUpdate(product.id)}>
                      Save
                    </button>
                    <button
                      onClick={() =>
                        setEditStatus((prevEditStatus) => ({
                          ...prevEditStatus,
                          [product.id]: { editing: false },
                        }))
                      }
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(product.id, product)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
