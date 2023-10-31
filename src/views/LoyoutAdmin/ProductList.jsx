import React, { useState, useEffect } from "react";
import { URL } from "../../config.js";
import styles from "./ProductList.module.css";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editedFields, setEditedFields] = useState({});
  const [editStatus, setEditStatus] = useState({});
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

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
    setEditedFields({
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      stock: product.stock,
      material: product.material,
      size: product.size,
      category: product.category,
      deleted: product.deleted,
    });
  };

  const handleFieldChange = (fieldName, value) => {
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [fieldName]: fieldName === "price" ? parseFloat(value) : value,
    }));
  };

  const handleInlineUpdate = async (productId, e) => {
    e.preventDefault();

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
      // console.log(
      //   "Enviando solicitud PUT con el siguiente contenido:",
      //   editedProduct
      // );
      const response = await fetch(`${URL}ProductsLista/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === productId ? updatedProduct : p))
        );
        setEditStatus((prevEditStatus) => ({
          ...prevEditStatus,
          [productId]: { editing: false },
        }));
        setEditedFields({});
      } else {
        const errorData = await response.json();
        console.error("Error updating product. Server response:", errorData);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const renderInputField = (fieldName, value, placeholder) => {
    if (
      fieldName === "size" ||
      fieldName === "category" ||
      fieldName === "material"
    ) {
      const options =
        fieldName === "size"
          ? ["S", "M", "L", "XL"]
          : fieldName === "category"
          ? ["accesorio", "figura", "decoracion"]
          : fieldName === "material"
          ? ["ABS", "PLA", "TPU"]
          : [];

      return (
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}></label>
          <select
            className={styles.editInput}
            value={value !== undefined ? value : placeholder}
            onChange={(e) => handleFieldChange(fieldName, e.target.value)}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    } else {
      return (
        <div className={styles.inputContainer}>
          <label className={styles.inputLabel}></label>
          <input
            className={styles.editInput}
            type="text"
            value={value !== undefined ? value : placeholder}
            onChange={(e) => handleFieldChange(fieldName, e.target.value)}
          />
        </div>
      );
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderHeaderCell = (key, title) => (
    <th key={key} onClick={() => handleSort(key)}>
      {title}
      {sortConfig.key === key && (
        <span>{sortConfig.direction === "asc" ? " ▲" : " ▼"}</span>
      )}
    </th>
  );

  const renderTableCell = (product, fieldName) => {
    const isEditing = editStatus[product.id]?.editing;
    const value = isEditing ? editedFields[fieldName] : product[fieldName];

    if (fieldName === "deleted") {
      return (
        <td key={fieldName}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}></label>
            <select
              className={styles.editInput}
              value={
                value !== undefined
                  ? value.toString()
                  : product[fieldName].toString()
              }
              onChange={(e) =>
                handleFieldChange(fieldName, e.target.value === "true")
              }
            >
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
        </td>
      );
    }

    return (
      <td key={fieldName}>
        {isEditing &&
        (fieldName === "size" ||
          fieldName === "category" ||
          fieldName === "material")
          ? renderInputField(fieldName, value, product[fieldName])
          : value}
      </td>
    );
  };

  const renderTableHeader = () => {
    const headers = [
      "Name",
      "Image",
      "Description",
      "Price",
      "Stock",
      "Size",
      "Material",
      "Category",
      "Deleted",
      "Actions",
    ];

    return (
      <tr>
        {headers.map((header) =>
          renderHeaderCell(header.toLowerCase(), header)
        )}
      </tr>
    );
  };

  const renderTable = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (sortConfig.key) {
        const keyA = a[sortConfig.key];
        const keyB = b[sortConfig.key];
        if (keyA < keyB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (keyA > keyB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });

    return (
      <table className={styles.table}>
        <thead>{renderTableHeader()}</thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              {renderTableCell(product, "name")}
              {renderTableCell(product, "image")}
              {renderTableCell(product, "description")}
              {renderTableCell(product, "price")}
              {renderTableCell(product, "stock")}
              {renderTableCell(product, "size")}
              {renderTableCell(product, "material")}
              {renderTableCell(product, "category")}
              {renderTableCell(product, "deleted")}
              <td className={styles.actions}>
                {editStatus[product.id]?.editing ? (
                  <>
                    <button onClick={(e) => handleInlineUpdate(product.id, e)}>
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
    );
  };

  return (
    <div className={styles.tableContainer}>
      <h2>Product List</h2>
      {renderTable()}
    </div>
  );
}
