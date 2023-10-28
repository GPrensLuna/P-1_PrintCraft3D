// Home.jsx
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

  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: null, max: null });

  const handleMaterialChange = (material) => {
    setSelectedMaterials((prevMaterials) => {
      return prevMaterials.includes(material)
        ? prevMaterials.filter((m) => m !== material)
        : [...prevMaterials, material];
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size === selectedSize ? null : size);
  };

  const handlePriceRangeChange = ({ min, max }) => {
    setPriceRange({ min, max });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL}Inventario?page=${currentPage}&limit=${pokemonPerPage}`,
          {
            params: {
              material: selectedMaterials,
              categoria: selectedCategory,
              tamaño: selectedSize,
              minPrice: priceRange.min,
              maxPrice: priceRange.max,
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
        setError("Hubo un error al recuperar los productos.");
        setLoading(false);
        console.error("Error en la solicitud:", error.message);
        alert(
          "Hubo un error al cargar los productos. Por favor, inténtelo de nuevo."
        );
      }
    };

    fetchData();
  }, [
    currentPage,
    selectedMaterials,
    selectedCategory,
    selectedSize,
    priceRange,
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

  return (
    <main className={style.main}>
      <CarouselHome />

      <div className={style.Container}>
        <div className={style.ContainerAsaider}>
          <Aside
            onMaterialChange={handleMaterialChange}
            onCategoryChange={handleCategoryChange}
            onSizeChange={handleSizeChange}
            onPriceRangeChange={handlePriceRangeChange}
          />
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
