import React from "react";
import axios from "axios";
import { URL } from "../../config.js";
import Footer from "../../Components/Footer/Footer";
import Aside from "../../Components/Aside/Aside.jsx";
import style from "./Home.module.css";
import { connect } from "react-redux";
import Card from "../../Components/Card/Card.jsx";
import { addProductInfo } from "../../redux/actions/actions.js";
import CarouselHome from "../../Components/CarouselHome/CarouselHome.jsx";

class Home extends React.Component {
  state = {
    loading: true,
    error: null,
    currentPage: (() => {
      const savedPage = localStorage.getItem("currentPage");
      return savedPage ? parseInt(savedPage, 10) : 1;
    })(),
    count: 0,
    limit: 12,
    selectedMaterials: [],
    selectedCategory: [],
    selectedSize: [],
    searchTerm: "", // Nuevo estado para almacenar el término de búsqueda
  };

  handleMaterialChange = (material) => {
    this.setState((prevState) => ({
      selectedMaterials: prevState.selectedMaterials.includes(material)
        ? prevState.selectedMaterials.filter((m) => m !== material)
        : [...prevState.selectedMaterials, material],
    }));
  };

  handleCategoryChange = (category) => {
    this.setState((prevState) => ({
      selectedCategory: prevState.selectedCategory.includes(category)
        ? prevState.selectedCategory.filter((c) => c !== category)
        : [...prevState.selectedCategory, category],
    }));
  };

  handleSizeChange = (size) => {
    this.setState((prevState) => ({
      selectedSize: prevState.selectedSize.includes(size)
        ? prevState.selectedSize.filter((s) => s !== size)
        : [...prevState.selectedSize, size],
    }));
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.selectedMaterials !== this.state.selectedMaterials ||
      prevState.selectedCategory !== this.state.selectedCategory ||
      prevState.selectedSize !== this.state.selectedSize ||
      prevState.searchTerm !== this.state.searchTerm // Agregar verificación de cambio en el término de búsqueda
    ) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    const {
      currentPage,
      selectedMaterials,
      selectedCategory,
      selectedSize,
      searchTerm,
    } = this.state;
    const { dispatch } = this.props;

    try {
      const response = await axios.get(
        `${URL}Inventario?page=${currentPage}&limit=${this.state.limit}`,
        {
          params: {
            material: selectedMaterials,
            categoria: selectedCategory,
            tamaño: selectedSize,
            // Agregar el término de búsqueda a los parámetros de la solicitud
            search: searchTerm,
          },
        }
      );

      if (response.status === 200) {
        const { data } = response;
        dispatch(addProductInfo(data.results));
        this.setState({
          count: data.count,
          limit: data.limit,
          loading: false,
        });
      } else {
        this.setState({
          error: "No se pudieron cargar los productos.",
          loading: false,
        });
        console.error("Error en la solicitud:", response.status);
        alert(
          "Hubo un error al cargar los productos. Por favor, inténtelo de nuevo."
        );
      }
    } catch (error) {
      this.setState({
        error: "Hubo un error al recuperar los productos.",
        loading: false,
      });
      console.error("Error en la solicitud:", error.message);
      alert(
        "Hubo un error al cargar los productos. Por favor, inténtelo de nuevo."
      );
    }
  };

  renderProducts = () => {
    const { searchResults, allProducts } = this.props;
    console.log(searchResults, allProducts);
    if (searchResults.length < 1) {
      return allProducts?.map((e) => (
        <Card
          key={e.id}
          id={e.id}
          name={e.name}
          image={e.image}
          description={e.description}
          //Size={e.Size.name}
          price={e.price}
          // Material={e.Material}
          // Category={e.Category}
        />
      ));
    }

    return searchResults?.map((e) => (
      <Card
        key={e.id}
        id={e.id}
        name={e.name}
        image={e.image}
        description={e.description}
        //Size={e.Size.name}
        price={e.price}
        // Material={e.Material}
        // Category={e.Category}
      />
    ));
  };

  loadPage = (page) => {
    if (page < 1 || page > Math.ceil(this.state.count / this.state.limit)) {
      return;
    }
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage, loading, error, limit, count } = this.state;

    return (
      <main className={style.main}>
        <div>
          <h1>Productos</h1>
        </div>
        <CarouselHome />

        <div className={style.Container}>
          <div className={style.ContainerAsaider}>
            <Aside
              onMaterialChange={this.handleMaterialChange}
              onCategoryChange={this.handleCategoryChange}
              onSizeChange={this.handleSizeChange}
            />
          </div>

          <div className={style.ContainerHome}>
            <div className={style.ContainerFilter}>
              <button
                className={style.BTNPreviu}
                onClick={() => this.loadPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className={style.SpanCurrentPage}>
                {currentPage} de {Math.ceil(count / limit)}
              </span>
              <button
                className={style.BTNNext}
                onClick={() => this.loadPage(currentPage + 1)}
                disabled={currentPage === Math.ceil(count / limit)}
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
                this.renderProducts()
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
}

const mapStateToProps = (state) => ({
  searchResults: state.searchResults,
  allProducts: state.allProducts,
});

export default connect(mapStateToProps)(Home);
