import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../config.js";
import Footer from "../../Components/Footer/Footer";
import Aside from "../../Components/Aside/Aside.jsx";
import style from "./Home.module.css";
import Card from "../../Components/Card/Card.jsx";
import { addProductInfo } from "../../redux/actions/actions.js";
import CarouselHome from "../../Components/CarouselHome/CarouselHome.jsx";

function Home() {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const pokemonPerPage = 12;
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(pokemonPerPage);

  // Nuevos estados para filtros
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL}Inventario?page=${currentPage}&limit=${pokemonPerPage}`,
          {
            params: {
              material: selectedMaterial,
              category: selectedCategory,
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
        }
      } catch (error) {
        setError("Hubo un error al recuperar los productos.");
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedMaterial, selectedCategory, dispatch]);

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

  return (
    <main className={style.main}>
      <CarouselHome />

      <div className={style.Container}>
        <div className={style.ContainerAsaider}>
          <Aside />
        </div>

        <div className={style.ContainerHome}>
          <div className={style.ContainerFilter}>
            <label htmlFor="materialSelect">Material:</label>
            <select
              id="materialSelect"
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="1">TPU</option>
              <option value="2">Material 2</option>
              {/* Agrega más opciones según tus materiales */}
            </select>

            <label htmlFor="categorySelect">Categoría:</label>
            <select
              id="categorySelect"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="category1">Categoría 1</option>
              <option value="category2">Categoría 2</option>
              {/* Agrega más opciones según tus categorías */}
            </select>

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
          </div>

          <div className={style.ContainerCards}>
            {loading ? (
              <p>Cargando productos...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              allProducts?.map((e) => (
                <Card
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  image={e.image}
                  description={e.description}
                  size={e.size}
                  price={e.price}
                  Material={e.Material}
                  Category={e.Category}
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
