import React, { useState } from "react";
import style from "./Inventario.module.css";
import { URL } from "../../config.js";

export default function Inventory() {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [producto, setProducto] = useState({
    name: "",
    image: null,
    description: "",
    size: "",
    price: "",
    stock: "",
    materialName: "",
    categoryName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });

    setErrors({
      ...errors,
      [name]: undefined,
    });
  };

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setProducto({ ...producto, image });

    if (image) {
      setProducto({
        ...producto,
        imagen: image,
      });

      // Mostrar vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      // Si no se seleccionó una imagen, puedes manejarlo aquí, como mostrar un mensaje de error
      console.error("No se ha seleccionado una imagen");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos al servidor usando una solicitud HTTP, por ejemplo, con fetch.
    // Asegúrate de ajustar esta parte según tu API y método de envío.
    fetch(`${URL}Inventario`, {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito.
        console.log("Producto agregado exitosamente:", data);
      })
      .catch((error) => {
        // Manejar errores de la solicitud al servidor.
        console.error("Error al agregar producto:", error);
      });
  };

  return (
    <div className={style.InventarioContainer}>
      <h2 className={style.InventarioTitle}>Registrar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={style.InventarioLabel}>
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={producto.name}
            onChange={handleInputChange}
            required
            className={style.InventarioInput}
          />
        </div>
        <div>
          <label htmlFor="image" className={style.InventarioLabel}>
            Imagen:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
            className={style.InventarioInput}
          />
          <div className={style.PreviuImg}>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className={style.ImagePreview}
              />
            )}
          </div>
        </div>
        <div>
          <label htmlFor="description" className={style.InventarioLabel}>
            Descripción:
          </label>
          <textarea
            id="description"
            name="description"
            value={producto.description}
            onChange={handleInputChange}
            required
            className={style.InventarioInput}
          />
        </div>
        <div>
          <label htmlFor="size" className={style.InventarioLabel}>
            Tamaño:
          </label>
          <select
            id="size"
            name="size"
            value={producto.size}
            onChange={handleInputChange}
            required
            className={style.InventarioInput}
          >
            <option value="">Selecciona un tamaño</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div>
          <label htmlFor="MaterialId" className={style.InventarioLabel}>
            Material:
          </label>
          <select
            id="MaterialId"
            name="MaterialId"
            value={producto.MaterialId}
            onChange={handleInputChange}
            required
            className={style.InventarioInput}
          >
            <option value="">Selecciona un material</option>
            <option value="ABS">ABS</option>
            <option value="TPU">TPU</option>
            <option value="PLA">PLA</option>
          </select>
        </div>
        <div>
          <label htmlFor="CategoryId" className={style.InventarioLabel}>
            Categoria:
          </label>
          <select
            id="CategoryId"
            name="CategoryId"
            value={producto.CategoryId}
            onChange={handleInputChange}
            required
            className={style.InventarioInput}
          >
            <option value="">Selecciona un Categorias</option>
            <option value="Accesorio">Accesorio</option>
            <option value="Figuras">Figuras</option>
          </select>
        </div>
        <div>
          <label htmlFor="price" className={style.InventarioLabel}>
            Precio:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={producto.price}
            onChange={handleInputChange}
            required
            className={style.InventarioInput}
          />
        </div>
        <div>
          <label htmlFor="stock" className={style.InventarioLabel}>
            Stock:
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={producto.stock}
            onChange={handleInputChange}
            required
            className={style.InventarioInput}
          />
        </div>
        <div>
          <button type="submit" className={style.InventarioSubmitButton}>
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
