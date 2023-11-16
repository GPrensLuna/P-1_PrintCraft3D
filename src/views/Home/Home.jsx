// Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../config.js";
import Footer from "../../Components/Footer/Footer";
import Aside from "../../Components/Aside/Aside.jsx";
import style from "./Home.module.css";
import Card from "../../Components/Card/Card.jsx";
import CarouselHome from "../../Components/CarouselHome/CarouselHome.jsx";
import { addProductInfo } from "../../redux/actions/actions.js";

import Swal from "sweetalert2";

function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const searchValue = useSelector((state) => state.searchValue);
  const userData = useSelector((state) => state.userData);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState("");

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setCurrentPage(1);
  };

  useEffect(() => {
    setLimit(limit);
    setCurrentPage(1);
  }, [limit]);

  const [selectedMaterials, setSelectedMaterials] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const handleMaterialChange = (material) => {
    setSelectedMaterials(material);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const resetAllFilters = () => {
    setSelectedMaterials(null);
    setSelectedCategory(null);
    setSelectedSize(null);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${URL}Inventario?page=${currentPage}&limit=${limit}`,
            {
              params: {
                material: selectedMaterials,
                category: selectedCategory,
                tamaño: selectedSize,
                search: searchValue,
              },
            }
          );

          if (response.status === 200) {
            const { data } = response;
            dispatch(addProductInfo(data.results));
            setCount(data.count);
            setLimit(data.limit);
            setLoading(false);
          } else {
            setError("No se pudieron cargar los productos.");
            setLoading(false);
            console.error("Error en la solicitud:", response.status);
            alert(
              "Hubo un error al cargar los productos. Por favor, inténtelo de nuevo."
            );
          }
        } catch (error) {
          if (axios.isCancel(error)) {
            // Manejar cancelación de la solicitud (si es necesario)
          } else if (error.response && error.response.status === 404) {
            // Si es un error 404, cambiar currentPage a 1
            setCurrentPage(1);
          } else {
            setError("Hubo un error al recuperar los productos.");
            setLoading(false);
            console.error("Error en la solicitud:", error.message);
            alert(
              "Hubo un error al cargar los productos. Por favor, inténtelo de nuevo."
            );
          }
        }
      };

      fetchData();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [
    currentPage,
    selectedMaterials,
    selectedCategory,
    selectedSize,
    searchValue,
    limit,
    dispatch,
  ]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(count / limit);

  const loadPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }
    setCurrentPage(page);
  };

  const handleProductDelete = async (idProduct) => {
    const shouldDelete = window.confirm(
      "¿Seguro que quieres eliminar este producto?"
    );

    if (!shouldDelete) {
      return;
    }

    try {
      const response = await axios.delete(`${URL}DeleteProdut/${idProduct}`);

      if (response.status === 200) {
        const updatedProducts = response.data.products;
        dispatch(addProductInfo(updatedProducts));
        alert("Producto eliminado exitosamente");
      } else {
        alert("Error al eliminar el producto. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
      alert("Error al eliminar el producto. Por favor, inténtelo de nuevo.");
    }
  };

  const addToCart = async (userId, productId) => {
    try {
      const response = await axios.post(`${URL}addOneToCart`, {
        userId,
        productId,
      });
      const { message } = response.data
      if (response.status===201){

        let cart = JSON.parse(localStorage.getItem("cart"))

        let index = cart.findIndex ((product) => product.id === productId)

        if (cart[index].cantidad-1===0){
          cart.splice(index, 1);
        }
        else {
          cart[index].cantidad-=1
        }

        localStorage.setItem("cart", JSON.stringify(cart))
  
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No permitido",
          text: `${message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Lo siento!",
        text: "Ha ocurrido un error: " + error.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleProductAddToCart = (productId) => {
      const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
      //Busca si existe el id del producto en el carrito
      const existingProductIndex = currentCart.findIndex(
        (product) => product.id === productId
      );
      //Si no existe en el carrito lo busca en el Estado global
      if (existingProductIndex === -1) {
        const productToAdd = allProducts.find(
          (product) => product.id === productId
        );
        if (productToAdd) {
          //Una vez que lo encuentra en el Estado lo agrega al carrito
            const updatedCart = [...currentCart, { ...productToAdd, cantidad: 1 }];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      } else {
        // Si ya está en el carrito, actualiza el contador
          const updatedCart = [...currentCart];
          updatedCart[existingProductIndex] = {
            ...updatedCart[existingProductIndex],
            cantidad: updatedCart[existingProductIndex].cantidad + 1,
          };
          localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      //console.log(`User ID: ${userData.userId}`);
      //console.log(`Product ID: ${productId}`);
      addToCart(userData.userId, productId);
  };

  return (
    <main className={style.main}>
      <div className={style.ContainerCarusel}>
        <CarouselHome />
      </div>
      <div className={style.ContainerAsaider}>
        <Aside
          onMaterialChange={handleMaterialChange}
          onCategoryChange={handleCategoryChange}
          onSizeChange={handleSizeChange}
          allProducts={allProducts}
          resetAllFilters={resetAllFilters}
        />
      </div>

      <div className={style.ContainerHome}>
        <div className={style.ContainerCards}>
          {loading ? (
            <p>Cargando productos...</p>
          ) : error ? (
            <p>{error}</p>
          ) : allProducts && allProducts.length > 0 ? (
            <div className={style.ContainerCards}>
              {allProducts.map((e) => (
                <Card
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  image={e.image}
                  description={e.description}
                  size={e.size}
                  price={e.price}
                  material={e.material}
                  category={e.category}
                  onDelete={handleProductDelete}
                  addToCart={() => handleProductAddToCart(e.id)}
                />
              ))}
            </div>
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      </div>
      <div className={style.ContainerFilter}>
        <button
          className={style.BTNPreviu}
          onClick={() => loadPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className={style.SpanCurrentPage}>
          {currentPage} de {totalPages}
        </span>
        <button
          className={style.BTNNext}
          onClick={() => loadPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
        <select onChange={handleLimitChange} id="limit" defaultValue={12}>
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="48">48</option>
        </select>
      </div>
      <div className={style.ContainerFooter}>
        <Footer />
      </div>
    </main>
  );
}

export default Home;
