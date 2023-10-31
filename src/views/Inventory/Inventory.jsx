import React, { useState } from "react";
import style from "./Inventario.module.css";
import { URL } from "../../config.js";
import axios from "axios";

export default function Inventory() {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageSelected, setImageSelectd] = useState("");
  const [producto, setProducto] = useState({
    name: "",
    image: null,
    description: "",
    size: "",
    price: "",
    stock: "",
    material: "",
    category: "",
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

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      console.error("No se ha seleccionado una imagen");
    }
  };

  // funcion para subir imagenes a cloudinary
  const uploadImage = () => {
    const formData = new FormData()
    formData.append("file", imageSelected)
    formData.append("upload_preset", "PrintCraft3DImagenes")

    axios.post("https://api.cloudinary.com/v1_1/deeufsn3k/image/upload",
    formData).then((response) =>{
      console.log(response);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${URL}Inventario`, {
      method: "POST",
      body: JSON.stringify(producto),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Producto agregado exitosamente:", data);
      })
      .catch((error) => {
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
      <input 
        type="file"
        onChange={(event) => {
          setImageSelectd(event.target.files[0]);
        }}
      />
      <button onClick={() => uploadImage()}>Subir Imagen</button>
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
          <button type="submit" className={style.InventarioSubmitButton}>
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
