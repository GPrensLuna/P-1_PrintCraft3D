// Aside.jsx
import React from "react";
import style from "./Aside.module.css";

//Importe lo siguiente
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../config.js";

const Aside = () => {


  //Declare todo esto desde aca
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);

  const [material, setMaterial] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [size, setSize] = useState('');

  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });

  const pokemonPerPage = 12;
  //const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(pokemonPerPage);
  //Hasta aca


//Hice este useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await axios.get(`${URL}/Filter?material=${material}&categoria=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&tamaño=${size}&page=${currentPage}&limit=${limit}`)
        if (response.status === 200) {
          let {data} = response
          //setCount(data.count);
          setLimit(data.limit);
        }
        else {
    
        }
      } catch (error) {
        
      }

    }
    fetchData();
  }, [currentPage, dispatch])

  return (
    <div>
      <aside className={style.aside}>
        <h1>Filtrar por:</h1>

        <div>
          <h2>Materiales</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Nailon</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>ABS</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>

          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Resina</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>

          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>PLA</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>
        </div>

        <div>
          <h2>Tecnicas de impresion</h2>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Chorro de aglomerante</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>
          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Chorro de material</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>

          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Extrusión de materiales</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>

          <div className={style.filtros}>
            <label className={style.AsideLabel}>
              <p>Polimerización en tina</p>
              <input className={style.AsideInput} type="checkbox" />
              <span className={style.span}></span>
            </label>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
