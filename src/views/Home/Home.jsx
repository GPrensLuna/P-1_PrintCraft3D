import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../config.js";
import Footer from "../../Components/Footer/Footer";
import Carousel from "../../Components/Carousel";
import Aside from "../../Components/Aside/Aside.jsx";
import imagenes from "../../imagenes/images.js";
import style from "./Home.module.css";
import Card from "../../Components/Card/Card.jsx";
import { addProductInfo, deleteProduct } from "../../redux/actions/actions.js";

function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const deletedCardsFromLocalStorage =
    JSON.parse(localStorage.getItem("deletedCards")) || [];

  const [deletedCards, setDeletedCards] = useState(
    deletedCardsFromLocalStorage
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const pokemonPerPage = 12;
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(pokemonPerPage);

  const [priceFilter, setPriceFilter] = useState(null);
  const [sizeFilter, setSizeFilter] = useState(null);
  const [materialFilter, setMaterialFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${URL}Inventario?page=${currentPage}&limit=${pokemonPerPage}`
  //       );

  //       if (response.status === 200) {
  //         const { data } = response;
  //         dispatch(addProductInfo(data.results));

  //         setCount(data.count);
  //         setLimit(data.limit);
  //         setLoading(false);
  //       } else {
  //         setError("No se pudieron cargar los productos.");
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       setError("Hubo un error al recuperar los productos.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [currentPage, dispatch]);

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

  const handleDeleteCard = (name) => {
    // Actualiza el estado local de tarjetas eliminadas
    const updatedDeletedCards = [...deletedCards, name];
    setDeletedCards(updatedDeletedCards);
    // Actualiza las tarjetas eliminadas en LocalStorage
    localStorage.setItem("deletedCards", JSON.stringify(updatedDeletedCards));

    // Supongamos que tienes una acción 'deleteProduct' que elimina un producto en Redux.
    dispatch(deleteProduct(name));
  };

  const filteredProducts = allProducts
    .filter((e) => !deletedCards.includes(e.name))
    .filter((e) => {
      if (priceFilter && e.price > Number(priceFilter)) {
        return false;
      }
      if (sizeFilter && e.size !== sizeFilter) {
        return false;
      }
      if (materialFilter && e.Material.name !== materialFilter) {
        return false;
      }
      if (categoryFilter && e.Category.name !== categoryFilter) {
        return false;
      }
      return true;
    });

  return (
    <main className={style.main}>
      <div className={style.ContainerCarusel}>
        <Carousel imagenes={imagenes} />
      </div>

      <div className={style.Container}>
        <div className={style.ContainerAsaider}>
          <Aside />
        </div>

        <div className={style.ContainerHome}>
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
            <div className={style.FilterInputs}>
              <input
                type="number"
                placeholder="Precio máximo"
                value={priceFilter || ""}
                onChange={(e) =>
                  setPriceFilter(
                    e.target.value === "" ? null : parseFloat(e.target.value)
                  )
                }
              />
              <select
                value={sizeFilter || ""}
                onChange={(e) =>
                  setSizeFilter(e.target.value === "" ? null : e.target.value)
                }
              >
                <option value="">Tamaño</option>
                <option value="s">S</option>
                <option value="l">L</option>
                <option value="m">M</option>
              </select>
              <select
                value={materialFilter}
                onChange={(e) => setMaterialFilter(e.target.value)}
              >
                <option value="">Material</option>
                <option value="PLA">PLA</option>
                <option value="ABS">ABS</option>
                {/* Agregar más opciones de materiales según tu necesidad */}
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Categoría</option>
                <option value="accesorio">accesorio</option>
                <option value="Figuras">Figuras</option>
                {/* Agregar más opciones de categorías según tu necesidad */}
              </select>
            </div>
            <div className={style.FilterInputs}>
              <input
                type="number"
                placeholder="Precio máximo"
                value={priceFilter || ""}
                onChange={(e) =>
                  setPriceFilter(
                    e.target.value === "" ? null : parseFloat(e.target.value)
                  )
                }
              />
              <select
                value={sizeFilter || ""}
                onChange={(e) =>
                  setSizeFilter(e.target.value === "" ? null : e.target.value)
                }
              >
                <option value="">Tamaño</option>
                <option value="s">S</option>
                <option value="l">L</option>
                <option value="m">M</option>
              </select>
              <select
                value={materialFilter}
                onChange={(e) => setMaterialFilter(e.target.value)}
              >
                <option value="">Material</option>
                <option value="PLA">PLA</option>
                <option value="ABS">ABS</option>
                {/* Agregar más opciones de materiales según tu necesidad */}
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">Categoría</option>
                <option value="accesorio">accesorio</option>
                <option value="Figuras">Figuras</option>
                {/* Agregar más opciones de categorías según tu necesidad */}
              </select>
            </div>
          </div>
          <div className={style.ContainerCards}>
            {loading ? (
              <p>Cargando productos...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              filteredProducts?.map((e) => (
                <Card
                  key={e.id}
                  name={e.name}
                  image={e.image}
                  description={e.description}
                  size={e.size}
                  price={e.price}
                  material={e.Material}
                  categoryName={e.Category}
                  onDeleteCard={handleDeleteCard}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className={style.ContainerFooter}>
        <Footer />
      </div>
    </main>
  );
}

export default Home;
