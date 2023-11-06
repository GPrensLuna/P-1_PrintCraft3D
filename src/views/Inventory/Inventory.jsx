import React, { useState } from "react";
// import style from "./Inventario.module.css";
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
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "PrintCraft3DImagenes");

    axios
      .post("https://api.cloudinary.com/v1_1/deeufsn3k/image/upload", formData)
      .then((response) => {
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
    <div className="container w-50 m-5 p-5 justify-content-center">
      <h2 className="m-3 p-1">Registrar Producto</h2>
      <form onSubmit={handleSubmit} className="">

        {/* Nombre */}
        <div className="row m-2">
          <label htmlFor="name" className="col-3 text-end text-uppercase p-2">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={producto.name}
            onChange={handleInputChange}
            required
            className="col-8 border border-3 border-primary p-1 rounded-3"
          />
        </div>

        {/* Tamaño, Material, Categoria */}
        <div className="row m-2 justify-content-center">
          <div className="col">
            <label htmlFor="size" className="col-5 text-end text-uppercase p-2">
              Tamaño:
            </label>
            <select
              id="size"
              name="size"
              value={producto.size}
              onChange={handleInputChange}
              required
              className="form-select form-select-sm hover cursor-pointer border-2 border-primary p-1 rounded-3"
            >
              <option value="">Seleccionar</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>

          <div className="col">
            <label
              htmlFor="material"
              className="col-5 text-end text-uppercase p-2"
            >
              Material:
            </label>
            <select
              id="material"
              name="material"
              value={producto.material}
              onChange={handleInputChange}
              required
              className="form-select form-select-sm hover cursor-pointer border-2 border-primary p-1 rounded-3"
            >
              <option value="">Seleccionar</option>
              <option value="ABS">ABS</option>
              <option value="TPU">TPU</option>
              <option value="PLA">PLA</option>
            </select>
          </div>

          <div className="col">
            <label
              htmlFor="category"
              className="col-5 text-end text-uppercase p-2"
            >
              Categoria:
            </label>
            <select
              id="category"
              name="category"
              value={producto.CategoryId}
              onChange={handleInputChange}
              required
              className="form-select form-select-sm hover cursor-pointer border-2 border-primary p-1 rounded-3"
            >
              <option value="">Seleccionar</option>
              <option value="Accesorio">Accesorio</option>
              <option value="Figuras">Figuras</option>
            </select>
          </div>
        </div>

        {/* Precio y Stock */}
        <div className="row m-2 justify-content-center">
          <div className="col">
            <label
              htmlFor="price"
              className="col-5 text-end text-uppercase p-2"
            >
              Precio:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={producto.price}
              onChange={handleInputChange}
              required
              className="w-50 border-2 border-primary p-1 rounded-3"
            />
          </div>
          <div className="col">
            <label
              htmlFor="stock"
              className="col-5 text-end text-uppercase p-2"
            >
              Stock:
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={producto.stock}
              onChange={handleInputChange}
              required
              className="w-50 border-2 border-primary p-1 rounded-3"
            />
          </div>
        </div>

        <div>
          {/* Imagen */}
          {/* Preview */}
          <div></div>
          <div className="row m-2">
            <label
              htmlFor="image"
              className="col-5 text-end text-uppercase p-2"
            >
              Imagen:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="col-8 border border-3 border-primary p-1 rounded-3"
            />
            <div className="col">
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="" />
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

          {/* Descripcion   */}
          <div>
            <label htmlFor="description" className="">
              Descripción:
            </label>
            <textarea
              id="description"
              name="description"
              value={producto.description}
              onChange={handleInputChange}
              required
              className=""
            />
          </div>

          {/* Agregar   */}
          <button type="submit" className="">
            Agregar Producto
          </button>
        </div>
      </form>
    </div>
  );
}
