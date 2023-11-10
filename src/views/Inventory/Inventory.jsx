import React, { useState } from "react";
import style from "./Inventario.module.css";
import { URL } from "../../config.js";
import axios from "axios";

export default function Inventory() {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSelected, setImageSelected] = useState("");
  console.log(imagePreview);
  const [producto, setProducto] = useState({
    name: "",
    image: "",
    description: "",
    size: "",
    price: "",
    stock: "",
    material: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto((prevProducto) => ({ ...prevProducto, [name]: value }));
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", imageSelected);
      formData.append("upload_preset", "PrintCraft3DImagenes");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/deeufsn3k/image/upload",
        formData
      );

      setImagePreview(response.data.url);
    } catch (error) {
      console.error("Error al subir la imagen:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await uploadImage();

      await axios.post(`${URL}Inventario`, {
        ...producto,
        image: imagePreview,
      });

      alert("Producto agregado exitosamente");
    } catch (error) {
      console.error("Error al agregar producto:", error.message);
    }
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
            onChange={(e) => {
              setImageSelected(e.target.files[0]); 
            } }
            className={style.InventarioInput}
          />
          <button onClick={() => uploadImage()}>Guardar foto</button>

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
          <label htmlFor="material" className={style.InventarioLabel}>
            Material:
          </label>
          <select
            id="material"
            name="material"
            value={producto.material}
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
          <label htmlFor="category" className={style.InventarioLabel}>
            Categoria:
          </label>
          <select
            id="category"
            name="category"
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
          <button  onClick={() => uploadImage()} type="submit" className={style.InventarioSubmitButton}>
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
}

